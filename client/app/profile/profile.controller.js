'use strict';

angular.module('fcclinkterestApp').controller('ProfileCtrl',
    function($scope, $stateParams, $http) {
      $http.get('/api/users/profile/' + $stateParams.id)
          .success(function(user) {
            $scope.userName = user.name;
            $scope.links = user.links;
          }).catch(function() {
            $scope.notFound = true;
          });
    });
