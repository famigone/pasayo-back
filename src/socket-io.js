import { Server } from 'socket.io';
import { FRONTEND_URL, NODE_ENV } from './config.js';

export const socketIO = async (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: NODE_ENV === 'development' ? '*' : FRONTEND_URL,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      console.log(`>>> User connected to socket: ${socket.id}`);

      socket.on('disconnect', (param) => {
        console.log('>>> Disconnected', param);
      });

      // event that captures coding
      socket.on('user_join_room', ({ room, user }) => {
        console.log('>>> user_join_room', room, user);
        socket.join(room);
        if (user) socket.broadcast.to(room).emit('user_joined_room', user);
      });

      socket.on('user_coding', function (data) {
        socket.broadcast.to(data.canal).emit('user_code', data);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
