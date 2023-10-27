# Reception Scale - BackEnd

BackEnd de um projeto construído por mim com a finalidade de poder se criar e gerenciar escalas de recepção.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Tecnologias utilizadas

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

# Rodando o projeto

Clone o repositório:

```sh
git clone https://github.com/SamuelFST/reception_scale_backend.git
```

Entre no diretório raiz do projeto, e execute o docker-compose da aplicação para iniciar todos os contêineres:

```sh
cd reception_scale_backend
```

```sh
docker-compose up --build -d
```

Após a imagem da API ser criada e os contêineres serem iniciados, o BackEnd estará pronto para ser acessado.

# Acessando a API

Após todos os contêineres serem criados, a API poderá ser acessada em [localhost:4002](http://localhost:4002).

# Documentação

A documentação de todos os endpoints da API estará disponível via Swagger em [localhost:4002/api-docs](http://localhost:4002/api-docs).
