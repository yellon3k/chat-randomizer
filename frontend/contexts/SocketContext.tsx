"use client";

import React, { createContext, useEffect, useState } from "react";
import { SocketContextType } from "@/types/socket.types";
import io from "socket.io-client";

const defaultSocketContext: SocketContextType = {
    socket: null,
    loading: true
}

const SocketContext = createContext<SocketContextType>(defaultSocketContext);

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [socketState, setSocketState] = useState(defaultSocketContext);

    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:4000";

    useEffect(() => {
        const socketConnection = io(WS_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 5000,
        })

        socketConnection.on('connect', () => {
            setSocketState({ socket: socketConnection, loading: false });
        });

        socketConnection.on('error', () => {
            setSocketState({ socket: null, loading: true });
        });

        return () => {
            socketConnection.disconnect();
        };
    }, []);

    if(socketState.loading) {
        return <div>Ładowanie połączenia...</div>;
    }

    return (
        <SocketContext.Provider value={socketState}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const context = React.useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
}