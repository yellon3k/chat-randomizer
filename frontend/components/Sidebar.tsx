export default function Sidebar() {
    return (
        <section className={"sidebar"}>
            <p className={"logo-text"}>Chat Randomizer</p>

            <div className={"stats"}>
                <div className={"stat-item"}>
                    <p className={"stat-number"}>0</p>
                    <p className={"stat-label"}>Online Users</p>
                </div>
                <div className={"stat-item"}>
                    <p className={"stat-number"}>0</p>
                    <p className={"stat-label"}>Searching Users</p>
                </div>
            </div>

            <p className={"author-credit"}>Made by Dawid W.</p>
        </section>
    );
}