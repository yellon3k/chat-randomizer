export type NewChatProps = {
    isConnectedToUserStatus: number;
}

export type InputProps = {
    disabled: boolean;
}

export type Stats = {
    onlineUsers: number;
    clientsInQueue: number;
    activeChats: number;
}

export type MessagesTypes = {
    type: "received" | "sent",
    time: string,
    message: string
}