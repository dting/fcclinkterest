'use strict';

var app = angular.module('fcclinkterestApp');

app.config(function(LightboxProvider) {
  LightboxProvider.templateUrl = '/app/profile/lightbox-template.html';
  LightboxProvider.getImageUrl = function(image) {
    return image.url;
  };
  LightboxProvider.getImageCaption = function (image) {
    return image.url;
  };
});

app.controller('ProfileCtrl',
  function($scope, $stateParams, $http, Lightbox, $window) {
    $http.get('/api/users/profile/' + $stateParams.id)
      .success(function(user) {
        $scope.userName = user.name;
        $scope.links = user.links;
      }).catch(function() {
        $scope.notFound = true;
      });

    $scope.openLightboxModal = function(index) {
      $scope.m = Lightbox.openModal($scope.links, index);
    };

    var w = angular.element($window).bind('resize', function() {
      if ($scope.m) {
        $scope.m.close();
        $scope.m = null;
      }
    });

    $scope.$on('$destroy', function() {
      w.unbind('resize');
    });
  });
