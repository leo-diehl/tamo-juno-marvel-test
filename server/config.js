const md5 = require('md5');

module.exports.marvelApiUrl = 'https://gateway.marvel.com/v1/public';

module.exports.getMarvelAuth = function () {
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;
  const timestamp = Date.now();

  return {
    ts: timestamp,
    apikey: publicKey,
    hash: md5(`${timestamp}${privateKey}${publicKey}`),
  };
};
