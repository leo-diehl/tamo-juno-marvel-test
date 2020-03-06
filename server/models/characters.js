const axios = require('axios');
const { marvelApiUrl, getMarvelAuth } = require('../config');

const mocked = require('./mocked');

const charactersEndpoint = 'characters';
const baseUrl = `${marvelApiUrl}/${charactersEndpoint}`;

function digestCharacter({
  id,
  name,
  description,
  thumbnail,
  urls,
}) {
  return {
    id,
    name,
    description,
    thumbnail,
    urls,
  };
}

function digestDetail({
  id,
  title,
  description,
  thumbnail,
  urls,
}) {
  return {
    id,
    title,
    description,
    thumbnail,
    urls,
  };
}

module.exports.getCharacters = (paging, filters) => {
  const url = `${baseUrl}`;
  const params = Object.assign(paging, filters, getMarvelAuth());

  return axios.get(url, { params })
    .then(({ data: { data } }) => ({
      total: data.total,
      results: data.results.map(digestCharacter),
    }));
};

module.exports.getById = (characterId) => {
  const url = `${baseUrl}/${characterId}`;
  const params = getMarvelAuth();

  return axios.get(url, { params })
    .then(({ data: { data } }) => (data.results.length ? data.results[0] : {}))
    .then((data) => digestCharacter(data));
};

module.exports.getCharacterComics = (characterId) => {
  const url = `${baseUrl}/${characterId}/comics`;
  const params = getMarvelAuth();

  return axios.get(url, { params })
    .then(({ data: { data } }) => data.results.map(digestDetail));
};

module.exports.getCharacterEvents = (characterId) => {
  const url = `${baseUrl}/${characterId}/events`;
  const params = getMarvelAuth();

  return axios.get(url, { params })
    .then(({ data: { data } }) => data.results.map(digestDetail));
};

module.exports.getCharacterSeries = (characterId) => {
  const url = `${baseUrl}/${characterId}/series`;
  const params = getMarvelAuth();

  return axios.get(url, { params })
    .then(({ data: { data } }) => data.results.map(digestDetail));
};

module.exports.getCharacterStories = (characterId) => {
  const url = `${baseUrl}/${characterId}/stories`;
  const params = getMarvelAuth();

  return axios.get(url, { params })
    .then(({ data: { data } }) => data.results.map(digestDetail));
};
