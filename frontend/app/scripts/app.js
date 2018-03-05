'use strict';

angular.module('ptlApp', ['ui.router', 'ngResource', 'ngDialog'])

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider        
           
            .state('app', {
                url: '/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller: 'LogoutController'
                    },
                    'content': {
                        templateUrl : 'views/signup.html',
                        controller : 'SignupController' 
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
          
            .state('app.mainfeed', {
                url: 'mainfeed',
                views: {
                    'content@': {
                        templateUrl : 'views/mainfeed.html',
                        controller : 'GalleryController'
                    }
                }
            })

            .state('app.login', {
                url: 'login',
                views: {           
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller: 'LoginController'
                    }
                }
            })
        
        $urlRouterProvider.otherwise('/');
    })
;
