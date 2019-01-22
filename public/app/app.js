angular.module('userApp', ['appRoutes','mainCtrl', 'userControllers','userServices','ngAnimate','validateServices'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    });