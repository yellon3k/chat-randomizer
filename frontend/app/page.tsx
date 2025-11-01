import Chat from '@/components/Chat';
import Sidebar from '@/components/Sidebar';
import {SocketProvider} from "@/contexts/SocketContext";

export default function Home() {
  return (
      <SocketProvider>
          <main>
              <Chat/>
              <Sidebar/>
          </main>
      </SocketProvider>
  );
}
