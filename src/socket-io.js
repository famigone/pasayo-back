import { Server } from 'socket.io';
import { PORT } from './config.js';

export const socketIO = async (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: `http://localhost:${PORT}`,
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      console.log(`>>> User connected to socket: ${socket.id}`);

      socket.on('disconnect', (param) => {
        console.log('>>> Disconnected', param);
      });

      // event that captures coding
      socket.on('user_join_room', ({ experiencia, canal, user }, callback) => {
        socket.join(canal);
        if (user) socket.broadcast.to(canal).emit('user_joined_room', user);
      });

      socket.on('user_coding', function (data) {
        socket.broadcast.to(data.canal).emit('user_code', data);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
