angular.module('userServices', [])

  .factory('User', function ($http) {
        userFactory = {};

        userFactory.create = function (reg) {
            return $http.post('/users',reg);
        }

        userFactory.validate = function (reg) {
            return $http.post('/login',reg);
        }

        return userFactory;
    });