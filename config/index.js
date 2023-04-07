const mongoose = require('mongoose');

const connectionURI = process.env.MONGODB_URI;

mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
