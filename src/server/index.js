import path from 'path';
import express from 'express';
import handleRender from './handleRender';

const port = 8000;
const server = express();

// view engine setup
server.set('views', path.join(__dirname, '../templates'));
server.set('view engine', 'pug');

server.use(express.static('public'));
server.get('/*', handleRender);

server.listen(port, () => {
    console.info(`Express listening on port ${port}`);
});
