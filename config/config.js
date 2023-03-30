const { connect, connection } = require('mongoose');

connect('mongodb://localhost/PoESpace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
