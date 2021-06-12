const express = require('express');
const path = require('path');
const router = require('./router/index');
const app = express();
const port = 8080;

app.use('/', router);

app.listen(8080, () => {
    console.log('localhost:8080');
});