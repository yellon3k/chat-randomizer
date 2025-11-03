import {Socket} from "socket.io";
import {MatchmakingService} from "../../services/matchmaking.service";
import {MessagesTypes} from "../../types/chat.type";

export default (socket: Socket, matchmakingService: MatchmakingService) => {
    socket.on('message.send', ({message}) => {
        const myPair = matchmakingService.findMyPair(socket.id);

        if(myPair) {
            const mess: MessagesTypes = {
                type: "sent",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                message
            };

            socket.emit('messages', mess);
            mess.type = 'received';
            socket.to(myPair).emit('messages', mess);
        }
    });
}
