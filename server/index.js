const path = require('path');

// Loading environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const routes = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// Routes
routes.set(app);

app.listen(3001, () => console.log('Express server is running on localhost:3001'));
