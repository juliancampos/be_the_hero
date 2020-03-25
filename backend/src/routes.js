const express = require('express');
const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.post('/ongs', ongController.create);
routes.get('/ongs', ongController.list);

routes.get('/profile', profileController.list);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.list);
routes.delete('/incidents/:id', incidentController.delete);

module.exports = routes;