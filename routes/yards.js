let express = require('express');
let yardsRouter = express.Router();
let yards = require('../controllers/yards.controller');

yardsRouter.route('/api/yards')
  .get(yards.list);

module.exports = yardsRouter;
