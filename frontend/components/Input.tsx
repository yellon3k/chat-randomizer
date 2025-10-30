import {InputProps} from "@/types/chat.types";

export default function Input({disabled}: InputProps) {
    return (
        <div className={"message-input__container"}>
            <input
                disabled={disabled}
                type="text"
                className={"message-input"}
                placeholder="Type your message..."
            />
            <button disabled={disabled} className={"send-button"}>Send</button>
        </div>
    )
}