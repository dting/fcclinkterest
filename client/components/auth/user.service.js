'use strict';

angular.module('fcclinkterestApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:controller/:id', {
      id: '@_id'
    },
    {
      add: {
        method: 'PUT',
        params: {
          controller:'add'
        }
      },
      remove: {
        method: 'DELETE',
        params: {
          controller:'remove',
          id: '@_url'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
