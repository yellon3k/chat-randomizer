import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import {registerSocket, searchingMatch} from "./components/sockets";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
  },
});

registerSocket(io);
searchingMatch(io);

server.listen(PORT, () => {
    console.clear();
    console.log('');
    console.log('------------------------------------------------')
    console.log(`------------- Server starting...   -------------`);
    console.log('------------- Author: \x1b[33mDawid W.\x1b[0m -------------');
    console.log('------------- Server Version: \x1b[33m1.0\x1b[0m  -------------');
    console.log(`------------- Listening on \x1b[33m*:${PORT}\x1b[0m  -------------`);
    console.log('------------------------------------------------')
    console.log('');
});
