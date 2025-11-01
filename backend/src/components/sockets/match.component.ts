import {Socket} from "socket.io";
import {MatchmakingService} from "../../services/matchmaking.service";

export default (socket: Socket, matchmakingService: MatchmakingService) => {
    socket.on('join.queue', () => {
        matchmakingService.addQueue(socket.id);
        socket.emit('queue.joined', { success: true });
        console.log(`Socket ${socket.id} joined the matchmaking queue.`);
    });
}
