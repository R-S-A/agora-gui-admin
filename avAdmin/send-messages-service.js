angular.module('avAdmin')
  .factory('SendMsg', function($modal, Authmethod, AdminPlugins) {
    var service = {
        showEditAuthCode: false,
        scope: {},
        user_ids: null,
        election: null
    };

    service.setElection = function(el) {
        service.showEditAuthCode = true;
        service.election = el;
    };

    service.editAuthCodes = function() {
      service.showEditAuthCode = true;
      service.sendAuthCodesModal();
    };

    service.sendAuthCodesModal = function() {
      if (!service.showEditAuthCode) {
          service.confirmAuthCodesModal();
          return;
      }

      $modal.open({
        templateUrl: "avAdmin/admin-directives/dashboard/send-auth-codes-modal.html",
        controller: "SendAuthCodesModal",
        size: 'lg',
        resolve: {
          election: function () { return service.election; },
          user_ids: function() { return service.user_ids; }
        }
      }).result.then(function () {
          service.showEditAuthCode = false;
          service.confirmAuthCodesModal();
      });
    };

    service.confirmAuthCodesModal = function() {
      $modal.open({
        templateUrl: "avAdmin/admin-directives/dashboard/send-auth-codes-modal-confirm.html",
        controller: "SendAuthCodesModalConfirm",
        size: 'lg',
        resolve: {
          election: function () { return service.election; },
          user_ids: function() { return service.user_ids; }
        }
      }).result.then(function (data) {
        if (data === 'editAuthCodes') {
          service.editAuthCodes();
        } else {
          service.sendAuthCodes();
        }
      });
    };

    service.sendAuthCodes = function() {
      var scope = service.scope;
      scope.loading = true;
      if (AdminPlugins.hook('send-auth-codes-pre', {el: service.election, ids: service.user_ids})) {
          Authmethod.sendAuthCodes(service.election.id, service.election, service.user_ids)
            .success(function(r) {
              scope.loading = false;
              //scope.msg = "avAdmin.dashboard.censussend";
              scope.msg = "avAdmin.census.sentCodesSuccessfully";
              AdminPlugins.hook('send-auth-codes-ok', {el: service.election, ids: service.user_ids, response: r});
            })
            .error(function(error) {
              scope.loading = false;
              scope.error = error.error;
              AdminPlugins.hook('send-auth-codes-ko', {el: service.election, ids: service.user_ids, response: error});
            });
      }
    };

    return service;
  });
