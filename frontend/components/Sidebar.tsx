"use client";

import {useSocket} from "@/contexts/SocketContext";
import {useEffect, useState} from "react";
import {Stats} from "@/types/chat.types";

export default function Sidebar() {
    const [stats, setStats] = useState<Stats>({
        onlineUsers: 0,
        clientsInQueue: 0,
        activeChats: 0,
    })

    const {socket} = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on("stats.update", (newStats: Stats) => {
                setStats(newStats);
            });
        }

        return () => {
            if (socket) {
                socket.off("stats.update");
            }
        };
    }, [socket]);

    return (
        <section className={"sidebar"}>
            <p className={"logo-text"}>Chat Randomizer</p>

            <div className={"stats"}>
                <div className={"stat-item"}>
                    <p className={"stat-number"}>{stats.onlineUsers}</p>
                    <p className={"stat-label"}>Online Users</p>
                </div>
                <div className={"stat-item"}>
                    <p className={"stat-number"}>{stats.clientsInQueue}</p>
                    <p className={"stat-label"}>Searching Users</p>
                </div>
                <div className={"stat-item"}>
                    <p className={"stat-number"}>{stats.activeChats}</p>
                    <p className={"stat-label"}>Active Chats</p>
                </div>
            </div>

            <p className={"author-credit"}>Made by Dawid W.</p>
        </section>
    );
}