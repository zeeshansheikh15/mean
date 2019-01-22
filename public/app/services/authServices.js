angular.module('validateServices', [])

    .factory('validation', function ($http, loginToken, $window, $timeout) {
        var validationFactory = {};

        validationFactory.validate = function (reg) {
            return $http.post('/api/login',reg).then(function (res) {

                loginToken.setToken(res.data.token);
                return res;
            });
        };


        validationFactory.getUser = function () {
            usern = $window.localStorage.getItem('user');
            console.log(usern);
            return $http.post('/api/getuser/'+usern).then(function (res) {
                return res;
            });
        };

        validationFactory.isLoggedIn = function () {
            if(loginToken.getToken()){
                return true;
            }else{
                return false;
            }
        };

        validationFactory.facebook = function (token) {
            $window.localStorage.setItem('user', token);
            loginToken.setToken(token);
        }

        // validationFactory.getUser = function () {
        //     if(loginToken.getToken()){
        //         var token  = $window.localStorage.getItem('user');
        //         console.log('token passed'+token);
        //         return $http.post('/api/getuser/:'+token).then(function (res) {
        //
        //             return res;
        //         });
        //     }else{
        //         $q.reject({message: 'user not found'});
        //     }
        // };

        validationFactory.logout =function () {
            loginToken.removeToken();
        };

        return validationFactory;
    })

    .factory('loginToken', function ($window) {
        var loginTokenfactory = {};

        loginTokenfactory.setToken = function (token) {
            $window.localStorage.setItem('token', token);
        };
        loginTokenfactory.getToken = function () {
            return $window.localStorage.getItem('token');
        }
        loginTokenfactory.removeToken = function () {
            $window.localStorage.removeItem('token');
        }

        return loginTokenfactory;
    });