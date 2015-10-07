angular.module('avAdmin')
  .directive('avColumnFilterBool', function() {
    function link(scope, element, attrs) {
      scope.status = {
        isOpen: false
      };
      scope.filter = {
        sort: '',
        value: ''
      };
      scope.filterPrefix = attrs.filterPrefix;
      scope.filterI18n = attrs.filterI18n;
      scope.filterI18nNo = attrs.filterI18nNo;
      scope.filterI18nYes = attrs.filterI18nYes;

      function setkey(el, key, val) {
        if (val === '') {
          delete el[key];
        } else {
          el[key] = val;
        }
      }

      scope.$watch('filter', function (newFilter, oldFilter) {
        if (_.isEqual(newFilter, oldFilter)) {
          return;
        }

        setkey(scope.filterOptionsVar, scope.filterPrefix + "__sort", scope.filter.sort);
        setkey(scope.filterOptionsVar, scope.filterPrefix + "__equals", scope.filter.value);
      }, true);
    }

    return {
      restrict: 'AE',
      link: link,
      scope: {
        filterOptionsVar: '='
      },
      templateUrl: 'avAdmin/admin-directives/column-filters/bool/column-filter-bool.html'
    };
  });
