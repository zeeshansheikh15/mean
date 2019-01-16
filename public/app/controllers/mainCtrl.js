angular.module('mainCtrl',[])

.controller('maincontroller',function ($http, $timeout, $location) {
   var app = this;
   this.loginuser = function (logindata) {
       $http.post('/api/login', this.logindata).then(function (response) {
           app.message = response.data.message;
           console.log(response.data);
           if(response.data.valid) {
               $timeout(function () {
                   $location.path('/');
               }, 1000);
           }
       });
   };

});