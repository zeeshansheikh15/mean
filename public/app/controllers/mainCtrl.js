angular.module('mainCtrl',['validateServices'])

.controller('maincontroller',function ($rootScope, loginToken, validation, $http, $timeout, $location, $window) {
    var app = this;
    app.loadhtml = false;
     $rootScope.$on('$routeChangeStart', function (event) {
         if (validation.isLoggedIn()) {
             validation.getUser().then(function (res) {
                 console.log(res);
             });
             app.username = $window.localStorage.getItem('user');
             app.loggedin = true;
             app.loadhtml = true;
         } else {
             console.log('logged out');
             app.loggedin = false;
             app.username = '';
             app.loadhtml = true;
         }
     });

   this.loginuser = function (logindata) {
      validation.validate(this.logindata).then(function (response) {
           app.message = response.data.message;
           console.log(response.data);
          app.username = response.data.user.username;
           if(response.data.valid) {
               $window.localStorage.setItem('user',response.data.user.username);
               $timeout(function () {
                   $location.path('/profile');
                   app.message = '';
               }, 1000);
           }
       });
   };

   this.logout = function () {
     validation.logout();
       $location.path('/logout');
     app.message = "User logged out successfully";
       $window.localStorage.removeItem('user');
       $timeout(function () {
           app.message = '';
           $location.path('/');
       }, 1000);
   };



});