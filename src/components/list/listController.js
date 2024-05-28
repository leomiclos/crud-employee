app.controller("listController", function ($scope, $http, $compile) {
  $scope.colaboradores = [];
  $scope.cargos = [];

  //mapear o ID do cargo para sua descrição
  function obterDescricaoCargo(idCargo) {
    var cargo = $scope.cargos.find(function (c) {
      return Number(c.id) === Number(idCargo);
    });
    return cargo ? cargo.descricao : "Desconhecido";
  }

  $http.get("http://localhost:3000/colaboradores").then(
    function (response) {
      $scope.colaboradores = response.data;
    },
    function (error) {
      console.error("Erro ao obter colaboradores:", error);
    }
  );

  $http.get("http://localhost:3000/cargos").then(
    function (response) {
      $scope.cargos = response.data;
    },
    function (error) {
      console.error("Erro ao obter cargos:", error);
    }
  );

  //obter a descrição do cargo de um colaborador
  $scope.obterDescricaoCargoColaborador = function (idCargo) {
    return obterDescricaoCargo(idCargo);
  };

    $scope.colaboradorEditado = {};
    $scope.abrirModalEdicao = function(colaborador) {
        $http.get('src/components/modal/edit/edit.html').then(function(response) {
            var modalContent = $compile(response.data)($scope);
            angular.element(document.querySelector('body')).append(modalContent);
    
            var modal = document.getElementById("editModal");
            if (!modal) {
                console.error("O modal não foi encontrado. Verifique se o ID 'editModal' está correto e se o modal está presente no arquivo modal.html.");
                return;
            }
    
            modal.style.display = "block";
    
            // Atribuir os dados do colaborador ao $scope.colaboradorEditado
            $scope.colaboradorEditado = angular.copy(colaborador);
            console.log("Dados do colaboradorEditado ao abrir modal:", $scope.colaboradorEditado);
        }, function(error) {
            console.error('Erro ao carregar o arquivo HTML do modal:', error);
        });
    };
    
    
    
    
    });
    

