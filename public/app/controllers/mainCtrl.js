angular.module('mainCtrl',['validateServices'])

.controller('maincontroller',function ($rootScope, loginToken, validation, $http, $timeout, $location, $window) {
    var app = this;
    app.loadhtml = false;
     $rootScope.$on('$routeChangeStart', function (event) {
         if (validation.isLoggedIn()) {
             //
             // validation.getUser().then(function (response) {
             //     console.log(response);
             //     app.username = response.data.user.username;
             //     app.email = response.data.user.email;
             //     app.password = response.data.user.password;
             // });

             validation.getuserdet().then(function (response) {
                 console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                 console.log(response);
                 // if(!response.data.success){
                 //     validation.logout();
                 // }
                 app.username = response.data.user;
                 app.email = response.data.email;
                 app.id = response.data.id;
                 app.photo = response.data.photo;
             });

             app.loggedin = true;
             app.loadhtml = true;
         } else {
             console.log('logged out');
             app.loggedin = false;
             app.username = null;
             app.loadhtml = true;
         }
     });





    this.loginuser = function (logindata) {
        validation.validate(this.logindata).then(function (response) {
            app.message = response.data.message;
            console.log(response);
            if(response.data.valid) {
                $timeout(function () {
                    $location.path('/main');
                    app.message = '';
                }, 1000);
            }
        });
    };


    this.checkuser = function () {
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook';

    };


    this.twitter = function () {
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/twitter';

    };

    this.google = function () {
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/google';

    };

    this.logout = function () {
        validation.logout();
        $location.path('/logout');
        app.message = "User logged out successfully";
        $timeout(function () {
            app.message = '';
            $location.path('/');
        }, 1000);
    };


});