import { Server } from 'socket.io';

declare global {
  namespace NodeJS {
    var io: Server;
  }
}
