# Filmes API

API REST para gerenciamento de filmes, desenvolvida com Node.js e Express.

---

## Sobre

Esta API permite cadastrar, consultar, atualizar e remover filmes. Os dados ficam salvos em um arquivo JSON local.

---

## Tecnologias

- Node.js - necessário ter instalando a versão .msi no site nodejs.org
- Express
- Swagger UI Express

---

## Como executar

```bash
# instalar as dependências
npm install

# iniciar o servidor
node index.js
```

Servidor disponível em: `http://localhost:3000`

---

## Documentação Swagger

```
http://localhost:3000/docs
```

---

## Endpoints

| Método | Rota          | Descrição                  |
|--------|---------------|----------------------------|
| GET    | `/filmes`     | Lista todos os filmes      |
| GET    | `/filmes/:id` | Busca um filme pelo ID     |
| POST   | `/filmes`     | Cadastra um novo filme     |
| PUT    | `/filmes/:id` | Atualiza um filme          |
| DELETE | `/filmes/:id` | Remove um filme            |

---

## Exemplos

### Listar todos
```
GET http://localhost:3000/filmes
```

### Buscar por ID
```
GET http://localhost:3000/filmes/1
```

### Cadastrar
```
POST http://localhost:3000/filmes
Content-Type: application/json

{
  "titulo": "Oppenheimer",
  "diretor": "Christopher Nolan",
  "ano": 2023,
  "nota": 8.7
}
```

### Atualizar
```
PUT http://localhost:3000/filmes/1
Content-Type: application/json

{
  "nota": 9.8
}
```

### Remover
```
DELETE http://localhost:3000/filmes/1
```

---

## Persistência

Os dados são armazenados no arquivo `data/filmes.json`. As alteracões feitas pela API é salva automaticamente nesse arquivo.

