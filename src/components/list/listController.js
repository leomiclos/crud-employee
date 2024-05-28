app.controller("listController", function ($scope, $http, $compile) {
  $scope.colaboradores = [];
  $scope.cargos = [];

  //requisições


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

  function obterDescricaoCargo(idCargo) {
    var cargo = $scope.cargos.find(function (c) {
      return Number(c.id) === Number(idCargo);
    });
    return cargo ? cargo.descricao : "Desconhecido";
  }

  $scope.buscaPorNome = function (nome) {
    if (nome && nome.trim() !== "") {
      $http.get(`http://localhost:3000/colaboradores?nome_like=${nome}`).then(
        function (response) {
          $scope.colaboradores = response.data;
        },
        function (error) {
          console.error("Erro ao obter colaboradores:", error);
        }
      );
    } else {
      // Se o campo de busca estiver vazio, carrega todos os colaboradores
      $scope.carregarColaboradores();
    }
  };

  
  $scope.carregarColaboradores = function(){
    $http.get("http://localhost:3000/colaboradores").then(
        function (response) {
          $scope.colaboradores = response.data;
        },
        function (error) {
          console.error("Erro ao obter colaboradores:", error);
        }
      );
  }

  $scope.obterDescricaoCargoColaborador = function (idCargo) {
    return obterDescricaoCargo(idCargo);
  };

  $scope.colaboradorEditado = {};
  $scope.abrirModalEdicao = function (colaborador) {
    $http.get("src/components/modal/edit/edit.html").then(
      function (response) {
        var modalContent = $compile(response.data)($scope);
        angular.element(document.querySelector("body")).append(modalContent);

        var modal = document.getElementById("editModal");
        if (!modal) {
          console.error(
            "O modal não foi encontrado. Verifique se o ID 'editModal' está correto e se o modal está presente no arquivo modal.html."
          );
          return;
        }

        $scope.cargoChange = function () {
          console.log("Cargo alterado:", $scope.colaboradorEditado.cargo.id);
        };

        modal.style.display = "block";

        $scope.colaboradorEditado = angular.copy(colaborador);
        console.log(
          "Dados do colaboradorEditado ao abrir modal:",
          $scope.colaboradorEditado
        );
      },
      function (error) {
        console.error("Erro ao carregar o arquivo HTML do modal:", error);
      }
    );
  };

  $scope.excluirColaborador = function (colaborador) {
    if (confirm("Você tem certeza que deseja excluir este colaborador?")) {
      var url = "http://localhost:3000/colaboradores/" + colaborador.id;
      $http.delete(url).then(
        function (response) {
          console.log("Colaborador excluído com sucesso:", response.data);
          if (confirm("Colaborador excluído com sucesso")) {
            window.location.reload();
          }
        },
        function (error) {
          console.error("Erro ao excluir o colaborador:", error);
        }
      );
    }
  };
});
