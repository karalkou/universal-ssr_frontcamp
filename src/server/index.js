import path from 'path';
import express from 'express';
const request = require('request');
import handleRender from './handleRender';

const port = 8000;
const server = express();

// view engine setup
server.set('views', path.join(__dirname, '../templates'));
server.set('view engine', 'pug');

server.use(express.static('public'));
server.get('/*', handleRender);

server.use('/api', function(req, res) {
    const url = 'http://localhost:9000/api' + req.url;
    console.log('*** url: ', url);
    let r = null;

    if(req.method === 'POST') {
        r = request.post({uri: url, json: req.body});
    } else {
        r = request(url);
    }

    req.pipe(r).pipe(res);
});

server.listen(port, () => {
    console.info(`Express listening on port ${port}`);
});
