'use client';

import React, {useEffect, useState, useRef} from 'react';
import {useSocket} from "@/contexts/SocketContext";
import {MessagesTypes} from "@/types/chat.types";

export default function Messages() {
    const {socket} = useSocket();
    const messagesRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<MessagesTypes[]>([]);

    useEffect(() => {
        if(socket) {
            socket.on("match.canceled", () => {
                if(messagesRef.current) {
                    messagesRef.current.innerHTML = "";
                }
            });

            socket.on('messages', (mess: MessagesTypes) => {
                setContent(prev => [...prev, mess])

                if(messagesRef.current) {
                 //   messagesRef.current.scrollIntoView({behavior: "smooth"});
                    const el = messagesRef.current;
                    if (!el) return;

                    requestAnimationFrame(() => {
                        el.scrollTo({
                            top: el.scrollHeight,
                            behavior: "smooth",
                        });
                    });
                }
            });

            return () => {
                if(socket) {
                    socket.off('messages');
                }
            }
        }
    }, [socket]);

    return (
        <div className={"messages-container"} ref={messagesRef}>
            {content.map((mess: MessagesTypes, index) => (
                <div key={index} className={`message ${mess.type}-message`}>
                    <div className={"info"}>
                        <span>{mess.type === "sent" ? 'You' : 'Foreign'}</span>
                        <span>{mess.time}</span>
                    </div>

                    <p className={"message-text"}>
                        {mess.message}
                    </p>
                </div>
            ))}
        </div>
    )
}