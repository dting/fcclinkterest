'use strict';

angular.module('fcclinkterestApp').controller('MainCtrl',
    function($scope, Auth, User) {
      $scope.link = {};
      $scope.links = Auth.getCurrentUser().links;
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.loginOauth = Auth.login;

      $scope.add = function() {
        if (!$scope.link.url) return;
        User.add({url:$scope.link.url}).$promise.then(function(err, res) {
          console.log(err);
          console.log(res);
        });
      };
    });
