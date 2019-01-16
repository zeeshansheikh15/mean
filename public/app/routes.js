angular.module('appRoutes', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'app/views/pages/home.html'
        })

        .when('/about', {
            templateUrl: 'app/views/pages/about.html'
        })

        .when('/register', {
            templateUrl: 'app/views/pages/users/register.html',
            controller: 'registerCtrl',
            controllerAs: 'register'
        })
        .when('/login', {
            templateUrl: 'app/views/pages/users/login.html'
        })
        .when('/logout', {
            templateUrl: 'app/views/pages/users/loggedout.html'
        })

        .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({
      enabled: true,
        requiredBase: false
    });
});
