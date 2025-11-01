let userOnline: Set<string> = new Set();

export class UsersOnlineService {
    getUsersOnlineCount(): number {
        return userOnline.size;
    }

    addUserOnline(userId: string): void {
        userOnline.add(userId);
    }

    removeUserOnline(userId: string): void {
        userOnline.delete(userId);
    }
}