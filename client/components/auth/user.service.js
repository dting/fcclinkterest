'use strict';

angular.module('fcclinkterestApp').factory('User', function($resource) {
  return $resource('/api/users/:controller/:id', {
        id: '@_id'
      },
      {
        add: {
          method: 'PUT',
          params: {
            controller: 'add'
          }
        },
        remove: {
          method: 'DELETE',
          params: {
            controller: 'remove'
          }
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        },
        random: {
          method: 'GET',
          params: {
            controller: 'random'
          }
        }
      });
});
