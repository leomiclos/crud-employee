// src/components/header/headerComponent.js
angular.module('appModule').component('appHeader', {
    template: `
        <div class="container">
            <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom flex-direction-row">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <h1><img src="src/assets/img/logo.png"></h1>
                </a>
                <ul class="nav nav-pills">
                    <li class="nav-item"><a href="#!/list" class="nav-link" aria-current="page">Usuários</a></li>
                    <li class="nav-item"><a href="#!/register" class="nav-link">Cadastro</a></li>
                    <li class="nav-item"><a href="/login" class="nav-link">Sair</a></li>
                </ul>
            </header>
        </div>
    `,
});
