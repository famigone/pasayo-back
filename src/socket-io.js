import { Server } from 'socket.io';
import { FRONTEND_URL } from './config.js';

export const socketIO = async (server) => {
  try {
    const io = new Server(server, {
      cors: {
        // origin: FRONTEND_URL,
        origin: '*',
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      console.log(`>>> User connected to socket: ${socket.id}`);

      socket.on('disconnect', (param) => {
        console.log('>>> Disconnected', param);
      });

      // event that captures coding
      socket.on('user_join_room', ({ session, user }) => {
        socket.join(session);
        if (user) socket.broadcast.to(session).emit('user_joined_room', user);
      });

      socket.on('user_coding', function (data) {
        socket.broadcast.to(data.canal).emit('user_code', data);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
