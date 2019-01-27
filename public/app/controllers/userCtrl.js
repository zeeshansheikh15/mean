angular.module('userControllers', ['validateServices'])

.controller('registerCtrl', function ($http, $location, $timeout) {

    var app = this;
    console.log('testin  ');
    this.registerUser = function (registerData) {
        $http.post('/api/users', this.registerData).then(function (response) {
           if(response.data.error.message){
               app.message = response.data.error.message;
           }else{
               app.message = response.data.message;
           }
           console.log(response);
           if(response.data.created) {
               $timeout(function () {
                   $location.path('/');
               }, 1000);
           }
        });
    };
})

    .controller('socialCtrl', function ($routeParams, validation, $window, $timeout, $location) {
        var app = this;
        console.log($routeParams.token);
        validation.social($routeParams.token)
        $timeout(function () {
            $location.path('/main');
            app.message = '';
        }, 1000);


    });