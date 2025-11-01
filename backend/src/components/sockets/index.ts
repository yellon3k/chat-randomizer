import { Socket } from "socket.io";
import { MatchmakingService } from "../../services/matchmaking.service";
import { UsersOnlineService } from "../../services/users.online.service";
import MatchComponent from "./match.component";
import {Stats} from "../../types/stats.type";

const matchmakingService = new MatchmakingService();
const usersOnlineService = new UsersOnlineService();

export function registerSocket(io : any) {
    io.on('connection', (socket : Socket) => {
        userOnlineCount(socket);

        MatchComponent(socket, matchmakingService);

        socket.on('disconnect', () => {
            userDisconnect(socket);
        });
    });
}

export function searchingMatch(io : any) {
    setInterval(() => {
        const users = matchmakingService.createPair();
        if(users) {
            const [userA, userB] = users;
            io.to(userA).emit('match.found');
            io.to(userB).emit('match.found');
        }

        const stats: Stats = {
            onlineUsers: usersOnlineService.getUsersOnlineCount(),
            clientsInQueue: matchmakingService.countQueues(),
            activeChats: matchmakingService.countActivePairs()
        }

     //   console.log(`Stats: ${JSON.stringify(stats)}`);

        io.emit('stats.update', stats);
    }, 1500);
}

function userOnlineCount(socket: Socket) {
    console.log('User connected:', socket.id);
    usersOnlineService.addUserOnline(socket.id);
}

function userDisconnect(socket: Socket) {
    console.log('User disconnected');
    usersOnlineService.removeUserOnline(socket.id);
    matchmakingService.removeQueue(socket.id);
    const myMatch = matchmakingService.findMyPair(socket.id);

    if(myMatch) {
        console.log(`Notifying opponent ${myMatch} of disconnection.`);
        matchmakingService.removeActivePair(socket.id);
        socket.to(myMatch).emit('match.canceled', { reason: 'opponent_disconnected' });
    }
}

