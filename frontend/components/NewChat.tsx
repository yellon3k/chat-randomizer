"use client";

import React, {useEffect, useState} from "react";
import {NewChatProps} from "@/types/chat.types";

const findingMessages = [
    "Still looking for someone to chat with...",
    "Hang tight! We're searching for a random user...",
    "Almost there! Finding a chat partner for you...",
];
const connectMessage = "Connected to a random user. Say hi!";
const noConnectionMessage = "Press the button to find a new chat partner.";

export default function NewChat(
    {isConnectedToUserStatus} : NewChatProps
) {
    const [displayedMessage, setDisplayedMessage] = useState<string>(noConnectionMessage);


    useEffect(() => {
        let messageIndex = 0;
        let intervalId: NodeJS.Timeout;

        function handleMessageChange() {
            if (isConnectedToUserStatus === 1) {
                setDisplayedMessage("Finding you a new chat partner...");

                intervalId = setInterval(() => {
                    setDisplayedMessage(findingMessages[messageIndex]);
                    messageIndex = (messageIndex + 1) % findingMessages.length;
                }, 4000);
            } else if (isConnectedToUserStatus === 2) {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                setDisplayedMessage(connectMessage);
            } else {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                setDisplayedMessage(noConnectionMessage);
            }
        }

        handleMessageChange();

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isConnectedToUserStatus]);

    return (
        <div className={`chat-title ${isConnectedToUserStatus !== 2 ? 'no-chatting' : ''}`}>
            <p className={"text"}>{displayedMessage}</p>
            {isConnectedToUserStatus === 0 && <button className={"new-chat-button"}>New Chat</button>}
        </div>
    )
}