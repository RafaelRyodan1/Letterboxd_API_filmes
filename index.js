const express = require('express');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());

// Documentação Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Funções para ler e salvar o arquivo JSON


function lerFilmes() {
  const dados = fs.readFileSync('./data/filmes.json', 'utf-8');
  return JSON.parse(dados);
}

function salvarFilmes(filmes) {
  fs.writeFileSync('./data/filmes.json', JSON.stringify(filmes, null, 2));
}


// GET /filmes — retorna todos os filmes

app.get('/filmes', function (req, res) {
  const filmes = lerFilmes();
  res.status(200).json(filmes);
});


// GET /filmes/:id — retorna um filme pelo ID

app.get('/filmes/:id', function (req, res) {
  const filmes = lerFilmes();
  const id = parseInt(req.params.id);
  const filme = filmes.find(function (f) {
    return f.id === id;
  });

  if (!filme) {
    res.status(404).json({ mensagem: 'Filme não encontrado.' });
    return;
  }

  res.status(200).json(filme);
});

// POST /filmes — cadastra um novo filme

app.post('/filmes', function (req, res) {
  const titulo    = req.body.titulo;
  const diretor   = req.body.diretor;
  const ano       = req.body.ano;
  const nota      = req.body.nota;

  if (!titulo || !diretor || !ano || !nota) {
    res.status(400).json({ mensagem: 'Preencha todos os campos: titulo, diretor, ano, nota.' });
    return;
  }

  const filmes = lerFilmes();

  // Gera o próximo id com base no maior ID existente
  let maiorId = 0;
  for (let i = 0; i < filmes.length; i++) {
    if (filmes[i].id > maiorId) {
      maiorId = filmes[i].id;
    }
  }

  const novoFilme = {
    id: maiorId + 1,
    titulo: titulo,
    diretor: diretor,
    ano: ano,
    nota: nota
  };

  filmes.push(novoFilme);
  salvarFilmes(filmes);

  res.status(201).json(novoFilme);
});

// PUT /filmes/:id — atualiza um filme existente

app.put('/filmes/:id', function (req, res) {
  const filmes = lerFilmes();
  const id = parseInt(req.params.id);

  let indice = -1;
  for (let i = 0; i < filmes.length; i++) {
    if (filmes[i].id === id) {
      indice = i;
      break;
    }
  }

  if (indice === -1) {
    res.status(404).json({ mensagem: 'Filme não encontrado.' });
    return;
  }

  // Atualiza apenas os campos enviados no body
  if (req.body.titulo)  filmes[indice].titulo  = req.body.titulo;
  if (req.body.diretor) filmes[indice].diretor = req.body.diretor;
  if (req.body.ano)     filmes[indice].ano     = req.body.ano;
  if (req.body.nota)    filmes[indice].nota    = req.body.nota;

  salvarFilmes(filmes);

  res.status(200).json(filmes[indice]);
});

// DELETE /filmes/:id — remove um filme

app.delete('/filmes/:id', function (req, res) {
  const filmes = lerFilmes();
  const id = parseInt(req.params.id);

  let indice = -1;
  for (let i = 0; i < filmes.length; i++) {
    if (filmes[i].id === id) {
      indice = i;
      break;
    }
  }

  if (indice === -1) {
    res.status(404).json({ mensagem: 'Filme não encontrado.' });
    return;
  }

  filmes.splice(indice, 1);
  salvarFilmes(filmes);

  res.status(200).json({ mensagem: 'Filme removido com sucesso.' });
});
// inicia o servidor
app.listen(3000, function () {
  console.log('Servidor rodando em http://localhost:3000');
  console.log('Documentação em http://localhost:3000/docs');
});
