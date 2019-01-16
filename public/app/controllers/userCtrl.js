angular.module('userControllers', [])

.controller('registerCtrl', function ($http, $location, $timeout) {

    var app = this;

    this.registerUser = function (registerData) {
        $http.post('/api/users', this.registerData).then(function (response) {
           app.message = response.data.message;
           if(response.data.created) {
               $timeout(function () {
                   $location.path('/');
               }, 1000);
           }
        });
    };
});