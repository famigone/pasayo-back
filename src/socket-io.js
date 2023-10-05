import { Server } from 'socket.io';

export const socketIO = async (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:8000',
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      console.log('>>> Connected to socket: ', socket.id);
      socket.on('disconnect', (param) => {
        console.log('>>> Disconnected', param);
      });

      // event that captures coding
      socket.on('canalIn', ({ experiencia, canal, user }, callback) => {
        socket.join(canal);
        if (user) socket.broadcast.to(canal).emit('nuevoSubcriptor', user);
      });

      socket.on('codeoEvent', function (data) {
        socket.broadcast.to(data.canal).emit('codeoEmit', data);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
