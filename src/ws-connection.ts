import { WebSocket, createWebSocketStream } from "ws";
import { IncomingMessage } from "http";
import { operationsListener } from "./operations-listener.js";

export async function webSocketConnection(
  webSocket: WebSocket,
  message: IncomingMessage
) {
  const webSocketStream = createWebSocketStream(webSocket, {
    encoding: "utf8",
    decodeStrings: false,
  });

  console.log(`WebSocket connected on ${message.socket.localPort} port!`);
  webSocketStream.on("data", async (chunk) => {
    const data = String(chunk);

    const [operation, ...args] = data.split(" ");
    const [arg1, arg2] = args.map((x: string) => Number(x) || 0);
    const { responseRecuired, info } = await operationsListener(
      operation,
      arg1,
      arg2
    );

    if (responseRecuired) {
      webSocketStream.write(`${info}\0`);
    }
  });

  webSocket.onclose = () => {
    console.log(
      `WebSocket disconnected from ${message.socket.localPort} port!`
    );
    webSocketStream.destroy();
  };
}
