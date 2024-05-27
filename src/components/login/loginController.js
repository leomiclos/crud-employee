app.controller('loginController', function($scope, $location) {
    $scope.user = {};
    
    $scope.login = function() {
        console.log($scope.user.name, $scope.user.password);
        if ($scope.user.name === 'user' && $scope.user.password === 'password') {
            $location.path('/list');
        } else {
            $scope.error = 'Credenciais inválidas.';
        }
    };
});
