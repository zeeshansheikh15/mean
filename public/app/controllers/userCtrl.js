angular.module('userControllers', [])

.controller('registerCtrl', function ($http, $location, $timeout) {

    var app = this;

    this.registerUser = function (registerData) {
        $http.post('/api/users', this.registerData).then(function (response) {
           app.message = response.data.message;
           console.log(response.data);
            console.log(response.data.success);
            console.log(response.data);
           if(response.data.created) {
               $timeout(function () {
                   $location.path('/');
               }, 1000);
           }
        });
    };
});