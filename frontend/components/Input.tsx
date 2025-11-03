"use client";

import React from 'react';
import {InputProps} from "@/types/chat.types";
import {useSocket} from "@/contexts/SocketContext";
import {useState} from "react";

export default function Input({disabled}: InputProps) {
    const [message, setMessage] = useState<string>("");
    const {socket} = useSocket();

    const handleSend = () => {
        if(message.length < 1 || socket === null) {
            return;
        }

        socket.emit('message.send', {message});
        setMessage("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    }


    return (
        <div className={"message-input__container"}>
            <input
                // disabled={disabled}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                className={"message-input"}
                placeholder="Type your message..."
            />
            <button disabled={disabled}
                    className={"send-button"}
                    onClick={handleSend}
            >Send</button>
        </div>
    )
}