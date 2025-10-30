export default function Messages() {
    return (
        <div className={"messages-container"}>
            <div className={"message received-message"}>
                <div className={"info"}>
                    <span>Foreign</span>
                    <span>15:30</span>
                </div>
                <p className={"message-text"}>
                    Hello! How are you?
                </p>
            </div>
            <div className={"message sent-message"}>
                <div className={"info"}>
                    <span>You</span>
                    <span>15:30</span>
                </div>

                <p className={"message-text"}>
                    Hi! I'm good, thanks. How about you?
                </p>
            </div>

        </div>
    )
}