'use strict';

angular.module('fcclinkterestApp')
    .controller('NavbarCtrl', function($scope, $location, Auth) {
      $scope.menu = [
        {
          title: 'Home',
          link: '/'
        }, {
          title: 'Profile',
          link: '/profile/' + Auth.getCurrentUser()._id
        }
      ];

      $scope.isCollapsed = true;
      $scope.isLoggedIn = Auth.isLoggedIn;
      $scope.isAdmin = Auth.isAdmin;
      $scope.getCurrentUser = Auth.getCurrentUser;

      $scope.logout = function() {
        Auth.logout();
        $location.path('/login');
      };

      $scope.loginOauth = Auth.login;

      $scope.isActive = function(route) {
        return route === $location.path();
      };
    });
