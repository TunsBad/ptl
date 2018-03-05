'use strict';

angular.module('ptlApp')

.controller('GalleryController', ['$scope', 'GalleryFactory', '$http', function ($scope, GalleryFactory, $http) {

    GalleryFactory.then(function(response) { 
            $scope.pictures = response.data.results
            console.log($scope.pictures);
            console.log($http.defaults.headers.common['Authorization']);
        }, function(error) {
            $scope.message = error.data.detail;
            console.log($scope.message);
        }
    );
}])

.controller('SignupController', ['$scope', 'AuthFactory', function ($scope, AuthFactory) {

	$scope.signupData = {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: ""
    };

	$scope.signup = function() {
		console.log($scope.signupData);
        AuthFactory.register($scope.signupData);

        $scope.signupData = {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            phone_number: ""
        };
        $scope.signupForm.$setPristine();
	}; 

}])

.controller('LoginController', ['$scope', 'AuthFactory', function ($scope, AuthFactory) {

	$scope.loginData = {
        email: "",
        password: ""
    };

    $scope.login = function() {
    	console.log($scope.loginData);
        AuthFactory.login($scope.loginData);
        
    	$scope.loginData = {
            email: "",
            password: ""
        }; 
        $scope.loginForm.$setPristine();
    };

}])

.controller('LogoutController', ['$scope', 'AuthFactory', '$state', function ($scope, AuthFactory, $state) {

	$scope.login = function() {
		$state.go('app.login'); //GOTO login page;
	};

	$scope.logout = function() {
		AuthFactory.logout(); //GOTO login page if successfull
	};

}])
;

//"9f58f309f40f7383733cb8f1f914ec48ec1861bd"