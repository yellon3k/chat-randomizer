const queues: Set<string> = new Set();
const activePairs: Map<string, string> = new Map();

export class MatchmakingService {
    countQueues(): number {
        return queues.size;
    }

    countActivePairs(): number {
        return activePairs.size / 2;
    }

    queueList(): string[] {
        return Array.from(queues);
    }

    addQueue(queueId: string) {
        if (queues.has(queueId)) return;
        if (activePairs.has(queueId)) return;

        queues.add(queueId);
    }

    removeQueue(queueId: string) {
        queues.delete(queueId);
    }

    createPair(): [string, string] | null {
        if (queues.size < 2) return null;

        const queue = this.queueList();

        const indexA = Math.floor(Math.random() * this.countQueues());
        const userA = queue[indexA];

        let indexB = Math.floor(Math.random() * this.countQueues());

        while (indexB === indexA) {
            indexB = Math.floor(Math.random() * this.countQueues());
        }

        const userB = queue[indexB];

        this.removeQueue(userA);
        this.removeQueue(userB);

        activePairs.set(userA, userB);
        activePairs.set(userB, userA);

        return [userA, userB];
    }

    findMyPair(queueId: string): string | null {
        if (!activePairs.has(queueId)) return null;
        return activePairs.get(queueId) || null;
    }

    removeActivePair(queueId: string) {
        const pairId = this.findMyPair(queueId);
        if (!pairId) return;

        activePairs.delete(queueId);
        activePairs.delete(pairId);
    }


}