import server from './src/server';

const { PORT: port = 3000 } = process.env;

server.listen(Number(port), () => {
  console.log(`server up, http://localhost:${port}`);
});
