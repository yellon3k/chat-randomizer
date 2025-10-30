"use client";

import Input from "@/components/Input";
import Messages from "@/components/Messages";
import NewChat from "@/components/NewChat";
import {useState} from "react";


export default function Chat() {
    const [isConnectedToUserStatus, setIsConnectedToUserStatus] = useState(2);



    return (
        <section className={"chat-section"}>
            <div className={"chat-window"}>
                <NewChat isConnectedToUserStatus={isConnectedToUserStatus} />

                {isConnectedToUserStatus === 2 && <Messages />}
            </div>

            <Input disabled={isConnectedToUserStatus !== 2} />
        </section>
    )
}