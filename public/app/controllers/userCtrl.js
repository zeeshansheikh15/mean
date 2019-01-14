angular.module('userControllers', [])

.controller('registerCtrl', function ($http) {

    var app = this;

    this.registerUser = function (registerData) {
        console.log(this.registerData);
        $http.post('/api/users', this.registerData).then(function (response) {
            console.log(response)
            app.message = response.data.message;

        });
    };
});