const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require("path");


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Make sure any unhandled errors inside promises are logged
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:\n%s', reason.stack || reason);
});

app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || '0.0.0.0');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('add stock', (stock) => {
    io.emit('add stock', stock);
    console.log(stock + ' added');
  });
  
  socket.on('remove stock', (stock) => {
    io.emit('remove stock', stock);
    console.log(stock + ' removed');
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(app.get('port'), app.get('ip'), () => {
  const addr = server.address();
  console.log(`Server listening on ${addr.address}:${addr.port}`);
});