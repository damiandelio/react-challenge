import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ws } from "./app/websocket";
import type { RootState } from "./app/store";
import { RealtimeList } from "./components/RealtimeList/RealtimeList";
import { Loader } from "./components/Loader/Loader";
import { StatusIndicator } from "./components/StatusIndicator/StatusIndicator";

export const App = () => {
  const connected = useSelector((state: RootState) => state.crypto.connected);

  useEffect(() => {
    ws.reconnect();
    return () => ws.close();
  }, []);

  return (
    <main style={{ padding: "0 1rem" }}>
      <StatusIndicator online={connected} />
      {connected ? <RealtimeList /> : <Loader />}
    </main>
  );
};
