app.controller("editController", function ($scope, $http) {
  // Carregar cargos disponíveis
  $http.get("http://localhost:3000/cargos").then(
    function (response) {
      $scope.cargos = response.data;
    },
    function (error) {
      console.error("Erro ao obter cargos:", error);
    }
  );

  // Inicializar colaboradorEditado se não estiver definido
  if (!$scope.colaboradorEditado) {
    $scope.colaboradorEditado = {
      nome: "",
      cpf: "",
      dataAdmissao: "",
      remuneracao: "",
      cargo: {
        id: 0,
      },
    };
  }

  // Função para detectar mudança de cargo
  $scope.cargoChange = function () {
    console.log("Cargo alterado:", $scope.colaboradorEditado.cargo.id);
  };

  // Função para salvar a edição
  $scope.salvarEdicao = function () {
    // Converter o ID do cargo para número, se necessário
    $scope.colaboradorEditado.cargo.id = parseInt(
      $scope.colaboradorEditado.cargo.id
    );

    var url =
      "http://localhost:3000/colaboradores/" + $scope.colaboradorEditado.id;
    console.log("Dados a serem enviados:", $scope.colaboradorEditado);

    $http.put(url, $scope.colaboradorEditado).then(
      function (response) {
        console.log("Dados salvos com sucesso:", response.data);
        // Fechar o modal após salvar
        if(confirm('Deseja alterar?')) {
            $scope.fecharModal();
            window.location.reload()

        }

      },
      function (error) {
        console.error("Erro ao salvar os dados do colaborador:", error);
      }
    );

    console.log("Salvando:", $scope.colaboradorEditado);
  };

  // Função para fechar o modal
  $scope.fecharModal = function () {
    var modal = document.getElementById("editModal");
    if (modal) {
      modal.style.display = "none";
    }
  };
});
