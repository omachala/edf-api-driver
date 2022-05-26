import express from 'express';
import cors from 'cors';
import apiRequest from './apiRequest';
import getCredentials from './getCredentials';
import getSession from './getSession';

const server = express();

server.use(cors());

const credentials = getCredentials();
getSession(credentials);

server.get('/', (req, res) => res.send('live'));

server.get('/:year/:month', async ({ params: { year, month } }, res) => {
  const session = await getSession(credentials);
  const data = await apiRequest({
    year: Number(year),
    month: Number(month),
    session,
  });
  res.json(data);
});

export default server;
