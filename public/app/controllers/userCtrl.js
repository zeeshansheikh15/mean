angular.module('userControllers', ['validateServices'])

.controller('registerCtrl', function ($http, $location, $timeout) {

    var app = this;
    console.log('testin  ');
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
})

.controller('facebookCtrl', function ($routeParams, validation, $window, $timeout, $location) {
    var app = this;
    console.log($routeParams.token);
    validation.facebook($routeParams.token)
    $timeout(function () {
        $location.path('/main');
        app.message = '';
    }, 1000);


});