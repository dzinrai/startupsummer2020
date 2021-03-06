const colors = require('./colors');
const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const options = { parseMessageDeflate: false };
const io = require('socket.io')(server, options);

const users = new Map();

const log = {
  sent: (msg) => {
    console.log(`${colors.FgGreen}--->${JSON.stringify(msg)}${colors.Reset}`);
  },
  recv: (msg) => {
    console.log(`${colors.FgCyan}<---${JSON.stringify(msg)}${colors.Reset}`);
  },
}

const DEFAULT_ROOM = 'general';

io.on('connection', (socket) => {
  console.log(`${colors.FgGreen} New connection from: ${socket.id}`);

  users.set(socket.id, { id: socket.id, username: 'anon'});
  socket.join(DEFAULT_ROOM);
  socket.currentRoom = DEFAULT_ROOM;

  socket.on('message', (data) => {
    log.recv(data);
    const toSend = { user: users.get(socket.id), message: data.payload };
    io.to(socket.currentRoom).emit('message', toSend);
    log.sent(toSend);
  });

  socket.on('set_username', (data) => {
    log.recv(data);
    users.set(socket.id, { ...users.get(socket.id), username: data.payload });
    console.log(`${socket.id} - new user name: ${data.payload}`);
  });

  socket.on('typing', () => {
    log.recv(`${socket.id} - typing`);
    socket.to(socket.currentRoom).broadcast.emit('typing', users.get(socket.id));
  });

  socket.on('set_room', (data) => {
    socket.leave(socket.currentRoom);
    socket.join(data.room);
    socket.currentRoom = data.room;
  });

  socket.on('disconnect', (reason) => {
    console.log(`Disconnected reason: ${reason}`);
  });
})


server.listen(2003);
