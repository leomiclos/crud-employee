var app = angular.module('appModule', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'src/components/login/login.html',
            controller: 'loginController'
        })
        .when('/register', {
            templateUrl: 'src/components/register/register.html',
            controller: 'registerController'
        })
        .when('/list', {
            templateUrl: 'src/components/list/list.html',
            controller: 'listController'
        })
        .otherwise({
            redirectTo: '/list'
        });
});

app.controller('appController', function($scope, $location) {
    $scope.showHeader = function() {
        return $location.path() !== '/login' 
    };  

    
    $scope.message = 'Bem vindo(a) ao teste frontend Memory. Desejamos boa sorte!';
});
