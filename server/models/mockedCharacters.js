const mocked = require('./mocked');

/* eslint-disable */
module.exports.getCharacters = (paging, filters) => Promise.resolve(mocked.characters);
module.exports.getById = (characterId) => Promise.resolve(mocked.character);
module.exports.getCharacterComics = (characterId) => Promise.resolve(mocked.charactercomics);
module.exports.getCharacterEvents = (characterId) => Promise.resolve(mocked.characterevents);
module.exports.getCharacterSeries = (characterId) => Promise.resolve(mocked.characterseries);
module.exports.getCharacterStories = (characterId) => Promise.resolve(mocked.characterstories);
/* eslint-enable */
