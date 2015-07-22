'use strict';

angular.module('fcclinkterestApp')
  .controller('MainCtrl', function ($scope, $http, $window, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.loginOauth = Auth.login;
  });
