import axios from 'axios';

const baseUrl = '/characters';

export default function getCharacters(filters, paging) {
  const params = Object.assign(filters, { paging });

  return axios.get(baseUrl, { params })
    .then(({ data }) => data);
}

export function getCharacterById(characterId) {
  const params = { characterId };

  return axios.get(`${baseUrl}/byId`, { params })
    .then(({ data }) => data);
}

export function getCharacterDetails(characterId, detail) {
  const allowedDetails = ['comics', 'events', 'series', 'stories'];
  if (!allowedDetails.includes(detail)) {
    return Promise.reject(new Error('Invalid parameters'));
  }

  const params = { characterId };

  return axios.get(`${baseUrl}/${detail}`, { params })
    .then(({ data }) => data);
}
