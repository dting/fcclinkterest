'use strict';

angular.module('fcclinkterestApp').controller('MainCtrl',
    function($scope, Auth, User, $state) {
      $scope.link = {};
      Auth.isLoggedInAsync(function(isLoggedIn) {
        $scope.links = isLoggedIn ? Auth.getCurrentUser().links : undefined;
      });
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.loginOauth = Auth.login;

      $scope.add = function() {
        if ($scope.link.url) {
          User.add({}, {url: $scope.link.url}, function(res) {
            $scope.link.url = '';
            $scope.links.push(res);
          });
        }
      };

      $scope.remove = function(link) {
        console.log(link);
        User.remove({}, link).$promise.then(function() {
          _.remove($scope.links, link);
        });
      };

      $scope.random = function() {
        User.random({}, function(res) {
          $state.go('profile', {id: res._id});
        });
      };
    });
