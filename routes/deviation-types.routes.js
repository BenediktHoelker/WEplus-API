let express = require('express');
let mongoose = require('mongoose');
let DeviationTypes = require('../controllers/deviation-types.controller');
let deviationTypesRouter = express.Router();

deviationTypesRouter.route('/api/deviationTypes')
  .get(DeviationTypes.list);

module.exports = deviationTypesRouter;
