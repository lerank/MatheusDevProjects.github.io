const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Importar o modelo de User
const Task = require('./models/Task'); // Importar o modelo Task

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // Permitir envio de JSON
// Conectar ao MongoDB
mongoose.connect('mongodb://localhost/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Rota para retornar todas as tarefas
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Rota para criar uma nova tarefa
app.post('/tasks', async (req, res) => {
  const task = new Task({ title: req.body.title, completed: false });
  await task.save();
  res.status(201).json(task);
});

// Rota para remover uma tarefa
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Rota para registrar um novo usuário
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Cria o hash da senha
    const user = new User({ username, password: hashedPassword });
    await user.save(); // Salva o usuário no MongoDB
    res.status(201).json({ message: 'Usuário registrado!' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }); // Busca o usuário pelo username
    if (!user || !(await bcrypt.compare(password, user.password))) { // Compara a senha
      return res.status(401).json({ message: 'Credenciais inválidas!' });
    }
    const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' }); // Gera o token JWT
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index'); // Renderiza index.ejs
});
