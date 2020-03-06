const useMockedValues = parseInt(process.env.USE_MOCKED_VALUES, 10);

const charactersModelPath = useMockedValues
  ? '../models/mockedCharacters'
  : '../models/characters';

const {
  getCharacters,
  getById,
  getCharacterComics,
  getCharacterEvents,
  getCharacterSeries,
  getCharacterStories,
} = require(charactersModelPath); // eslint-disable-line

const { buildPaging } = require('../utils');

module.exports.get = ({ query }, res) => {
  const paging = buildPaging(JSON.parse(query.paging) || {});

  const filters = {};
  if (query.search) {
    // We'll be using the search string to filter by the character's name start
    filters.nameStartsWith = query.search;
  }

  getCharacters(paging, filters)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getById = ({ query }, res) => {
  const { characterId } = query;
  if (!characterId) {
    res.status(400).send('Invalid parameters');
  }

  getById(characterId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getComics = ({ query }, res) => {
  const { characterId } = query;
  if (!characterId) {
    res.status(400).send('Invalid parameters');
  }

  getCharacterComics(characterId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getEvents = ({ query }, res) => {
  const { characterId } = query;
  if (!characterId) {
    res.status(400).send('Invalid parameters');
  }

  getCharacterEvents(characterId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getSeries = ({ query }, res) => {
  const { characterId } = query;
  if (!characterId) {
    res.status(400).send('Invalid parameters');
  }

  getCharacterSeries(characterId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getStories = ({ query }, res) => {
  const { characterId } = query;
  if (!characterId) {
    res.status(400).send('Invalid parameters');
  }

  getCharacterStories(characterId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};
