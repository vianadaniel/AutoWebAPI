<h1 align="center">
    Teste de back-end WebAutoAPI
</h1>

<p align="center">
  <a href="https://www.linkedin.com/in/daniel-viana-almeida/">
    <img 
        alt="Made by Daniel Almeida" 
        src="https://img.shields.io/badge/MADE%20BY-Daniel%20Almeida-%230077b5?style=flat-square&logo=linkedin">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%20brightgreen?style=flat-square&logo=">

  <a href="https://www.typescript.com/">
    <img 
        alt="TypeScript" 
        src="https://img.shields.io/badge/STACK-TypeScript-%230077b5?style=flat-square&logo=TypeScript">
  </a>
  <a href="">
    <img 
        alt="server Node.js" 
        src="https://img.shields.io/badge/Server-Node.js-%23339933?style=flat-square&logo=node.js">
  </a>
  <a href="https://cloud.google.com/mongodb">
<img 
        alt="server Node.js" 
        src="https://img.shields.io/badge/DataBase-MongoDB-%23339933?style=flat-square&logo=mongodb">
</a>
  
</p>

### Objetivo 

Desenvolver um sistema web que nos permita controlar a utilização dos automóveis de uma empresa.

### Instalar

```
npm i
```

Criar o arquivo .env nesse modelo

```

MONGO_URI = mongodb+srv://xxxx
NODE_ENV = development

```



Para criar um banco de dados cadastre em <a href="https://cloud.google.com/mongodb">
<img 
        alt="server Node.js" 
        src="https://img.shields.io/badge/WebPage-MongoDB-%23339933?style=flat-square&logo=mongodb">
</a>

Utililize o comando

```
npm run data:import
```

Sobe um banco de dados para teste em seu servidor mongo

```
npm run data:destroy
```

Apaga todo banco de dados de teste em seu servidor mongo

## Docker

```
docker build -t webaautoapi/api-ts .

docker run -d -p 5001:5000 webaautoapi/api-ts
```

## Utilize as extensão .rest port 5001 no docker, port 5000 no localhost para bater nos end points

---

## Cars

A modelagem do Schema foi feito assim

```
    plate: string
    color: string
    brand: string
    trashed?: boolean
    isAvailable?: boolean
```

Primeiro end point pega todos os carros


```
### Get Cars

get http://localhost:5000/api/cars
Content-Type: application/json

```

Segundo end point cria o carro e retorna ele

```
### Create car

POST http://localhost:5000/api/cars/create
Content-Type: application/json

{
	"plate": "owq1237",
	"color": "green",
	"brand": "Fiat"
	
}
```

Terceiro end point deleta o carro setando trashed true ou false

```
### Delete and Recover car

PATCH http://localhost:5000/api/cars/delete
Content-Type: application/json

{
	"plate": "asd1234"
}
```

Quarto end point filtra o carro pela color ou pela brand por regex via query

```
### Filter car

GET http://localhost:5000/api/cars/filter?text=blue123
Content-Type: application/json
```

Quinto end point atualiza o carro pelo id

```
### Update car

put http://localhost:5000/api/cars/60c2f93d4d00592880e3ee1e
Content-Type: application/json

{
	"brand": "test",
	"plate": "asd4321",
	"color": "red"
}
```

## Drivers

A modelagem foi feita com nome da empresa, cnpj, usuário que criou, um array de produtos com nome e preço e um array de serviços

```
{
    name: string,
    trashed: Boolean
    }

```

Primeiro end point pega os motoristas 

```
### Get Drivers

get http://localhost:5000/api/drivers
Content-Type: application/json
```

Segundo end point cria motorista

```
### Create driver

POST http://localhost:5000/api/drivers/create
Content-Type: application/json

{
	"name": "Joaquim"
	
	
}

```

Terceiro end point deleta colocando trashed para true ou false

````
### Delete and recover driver

PATCH http://localhost:5000/api/drivers/delete/60c27707963d74f5f4c264e4
Content-Type: application/json
````

Quarto end point filtra pelo nome

```
### Get driver by name

GET http://localhost:5000/api/drivers/filter?text=Daniel
Content-Type: application/json

```

### Utils

A modelagem do utils tem referencia pelo carro e pelo motorista

````
 startDate: {
        required: true,
        type: Date,
    },
    endDate: {
        type: Date,
    },
    driver: {
        type: mongoose.Types.ObjectId,
        ref: 'Drivers',
        required: true
    },
    car: {
        type: mongoose.Types.ObjectId,
        ref: 'Cars',
        required: true
    },
    reason: {
        required: true,
        type: String,
    },
````
Primeiro end point pega as utils

````
### Get utils

GET http://localhost:5000/api/utils
Content-Type: application/json
````

Segundo end point cria a utilização de um carro com motorista e motivo

````
### Create util

POST http://localhost:5000/api/utils/create
Content-Type: application/json

{
	"car": "60c27707963d74f5f4c264e1",
	"reason": "trip",
	"driver": "60c27707963d74f5f4c264e4"
	
	
}
````

Terceiro end point recebe o carro pelo id

`````
### Finish util

PATCH http://localhost:5000/api/utils/finish/60c27fb60052ce07cd8347e8
Content-Type: application/json

````


