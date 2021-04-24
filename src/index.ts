import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
