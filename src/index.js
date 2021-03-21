import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const EXECUTION_PORT = 3000;

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (_req, res) => res.send('Welcome to Thumbnail WS App!'));

server.use('/thumbnail', require('./controller/thumbnailController'));

server.listen(EXECUTION_PORT, () => console.log(`App is listening to port ${EXECUTION_PORT}`));