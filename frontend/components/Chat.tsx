"use client";

import Input from "@/components/Input";
import Messages from "@/components/Messages";
import NewChat from "@/components/NewChat";
import {useEffect, useState} from "react";
import {useSocket} from "@/contexts/SocketContext";


export default function Chat() {
    const {socket} = useSocket();
    const [isConnectedToUserStatus, setIsConnectedToUserStatus] = useState(0);

    useEffect(() => {
        if (socket) {
            socket.on("queue.joined", () => {
                setIsConnectedToUserStatus(1);
            });

            socket.on("match.found", () => {
                setIsConnectedToUserStatus(2);
            });

            socket.on("match.canceled", () => {
                console.log("Match canceled by the server.");
                setIsConnectedToUserStatus(0);
            });
        }

        return () => {
            if (socket) {
                socket.off("queue.joined");
                socket.off("match.found");
                socket.off("match.canceled");
            }
        };
    }, [socket]);

    return (
        <section className={"chat-section"}>
            <div className={"chat-window"}>
                <NewChat isConnectedToUserStatus={isConnectedToUserStatus} />

                {isConnectedToUserStatus === 2 ? <Messages /> : null}
            </div>

            <Input disabled={isConnectedToUserStatus !== 2} />
        </section>
    )
}