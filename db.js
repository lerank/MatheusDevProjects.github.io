const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

module.exports = mongoose;