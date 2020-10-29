const express = require('express');
const Router = require('../accounts/router');

const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', Router);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'api is real up  right now' });
});

module.exports = server;
