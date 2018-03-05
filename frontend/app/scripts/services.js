'use strict';

angular.module('ptlApp')

.constant("baseURL", "http://pentiumtech-api.herokuapp.com/api/v1.0/")

.factory('GalleryFactory', ['$resource', 'baseURL', '$http', function ($resource, baseURL, $http) {

	    $http.defaults.headers.common['Authorization'] = 'Token e0aa8b152d2ee9d386769c6a20fcd984aa83565f';
        return $http.get(baseURL + "mainfeed/"); 
}])

.factory('AuthFactory', ['baseURL', '$http', '$state', 'ngDialog', function (baseURL, $http, $state, ngDialog) {

        var authFac = {};
        var authToken = '';

        authFac.register = function(signupData) {       
            $http.post(baseURL + "users/signup/", signupData)
                .then(function(response) { 
                    authFac.login({ email:signupData.email, password:signupData.password });                     
                        
                    console.log(response);
                },
                function(error) {
                       var message = '\
                            <div class="ngdialog-message">\
                            <div align="center"><h3 style="color:red;">REGISTERATION FAILED</h3></div>';
                        ngDialog.openConfirm({ template: message, plain: 'true'});
                        
                        console.log("REGISTERATION FAILED");
                });       
        };

        authFac.login = function(loginData) {        
            $http.post(baseURL + "users/login/", loginData)      
                .then(function(response) {
                	authToken = response.data.auth_token;
                    $http.defaults.headers.common['Authorization'] = 'Token ' + authToken;
                    $state.go('app.mainfeed'); //GOTO mainfeed page;
                    
                    console.log($http.defaults.headers.common['Authorization']);
                }, 
                function(error) {
                    var message = '\
                        <div class="ngdialog-message">\
                        <div align="center"><h3 style="color:red;">LOGIN FAILED</h3></div>';
                    ngDialog.openConfirm({ template: message, plain: 'true'});

                    console.log("LOGIN FAILED")
                });
        };

        authFac.logout = function() {
            $http.post(baseURL + "users/logout/")
                .then(function(response) {
                    $http.defaults.headers.common['Authorization'] = '';  
                    var result = response.data.results;

                    var message = '\
                        <div class="ngdialog-message">\
                        <div align="center"><h3 style="color:blue;">YOU HAVE SUCCESSFULLY LOGGED OUT</h3></div>';
                    ngDialog.openConfirm({ template: message, plain: 'true'});
                    $state.go('app.login');
                    console.log(result);
                    console.log($http.defaults.headers.common['Authorization']);
                },
                function() {
                    console.log('PLEASE LOGIN FIRST BEFORE LOGGING OUT');
                    var message = '\
                        <div class="ngdialog-message">\
                        <div align="center"><h3 style="color:red;">PLEASE LOGIN FIRST</h3></div>';
                    ngDialog.openConfirm({ template: message, plain: 'true'});
                });             
        };
     
        return authFac;

}])
;