angular.module('mainCtrl',[])

.controller('maincontroller',function ($http, $timeout, $location, $window) {
   var app = this;

   if($window.localStorage.getItem('token')){
       console.log('User Logged in');
   }else{
       console.log('Not Logged in');
   }

   this.loginuser = function (logindata) {
       $http.post('/api/login', this.logindata).then(function (response) {
           app.message = response.data.message;
           console.log(response.data.token);
           if(response.data.valid) {
               $window.localStorage.setItem('token',response.data.token)
               $timeout(function () {
                   $location.path('/');
               }, 1000);
           }
       });
   };

   this.logout = function () {
     $window.localStorage.removeItem('token');
       $location.path('/logout');
     app.message = "User logged out successfully";
       $timeout(function () {
           $location.path('/');
       }, 1000);
   };

});