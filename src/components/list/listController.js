app.controller('listController', function($scope, $http) {
    $scope.colaboradores = [];
    $scope.cargos = [];

    //mapear o ID do cargo para sua descrição
    function obterDescricaoCargo(idCargo) {
        var cargo = $scope.cargos.find(function(c) {
            return Number(c.id) === Number(idCargo);
        });
        return cargo ? cargo.descricao : 'Desconhecido';
    }

    $http.get('http://localhost:3000/colaboradores')
        .then(function(response) {
            $scope.colaboradores = response.data;
            console.log(response.data);
        }, function(error) {
            console.error('Erro ao obter colaboradores:', error);
        });
        
    $http.get('http://localhost:3000/cargos')
        .then(function(response) {
            $scope.cargos = response.data;
        }, function(error) {
            console.error('Erro ao obter cargos:', error);
        });

    //obter a descrição do cargo de um colaborador
    $scope.obterDescricaoCargoColaborador = function(idCargo) {
        return obterDescricaoCargo(idCargo);
    };
});
