const charactersController = require('../controllers/characters');

const charactersEndpoint = '/characters';

module.exports.set = function set(app) {
  app.get(charactersEndpoint, (req, res) => {
    charactersController.get(req, res);
  });

  app.get(`${charactersEndpoint}/byId`, (req, res) => {
    charactersController.getById(req, res);
  });

  app.get(`${charactersEndpoint}/comics`, (req, res) => {
    charactersController.getComics(req, res);
  });

  app.get(`${charactersEndpoint}/events`, (req, res) => {
    charactersController.getEvents(req, res);
  });

  app.get(`${charactersEndpoint}/series`, (req, res) => {
    charactersController.getSeries(req, res);
  });

  app.get(`${charactersEndpoint}/stories`, (req, res) => {
    charactersController.getStories(req, res);
  });
};
