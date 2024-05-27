app.controller('registerController', function($scope, $http) {

    $http.get('http://localhost:3000/cargos')
        .then(function(response) {
            $scope.cargos = response.data;
        }, function(error) {
            console.error('Erro ao obter cargos:', error);
        });

    $scope.colaborador = {
        nome: '',
        cpf: '',
        dataAdmissao: '',
        remuneracao: '',
        cargo: {
            id: 0
        }
    };


    // Função para formatar a data para dd/mm/yyyy
    $scope.formatDate = function(date) {
        var d = new Date(date);
        var month = '' + (d.getMonth() + 1);
        var day = '' + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [day, month, year].join('/');
    };

    $scope.register = function() {
        // Formata a data de admissão antes de enviar
        $scope.colaborador.dataAdmissao = $scope.formatDate($scope.colaborador.dataAdmissao);

        console.log('Colaborador cadastrado:', $scope.colaborador);
        $http.post('http://localhost:3000/colaboradores', $scope.colaborador)
        .then(function(response) {
            $scope.cargos = response.data;

            $scope.colaborador = {
                nome: '',
                cpf: '',
                dataAdmissao: '',
                remuneracao: '',
                cargo: {
                    id: 0
                }
            };

            alert('Colaborador cadastrado com sucesso!');

        }, function(error) {
            console.error('Erro ao obter cargos:', error);
            alert('Erro ao cadastrar colaborador. Verifique o console para mais detalhes.');

        });
    };


});
