import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { httpServer } from "./http-server.js";
import { webSocketConnection } from "./ws-connection.js";

dotenv.config();

const HTTP_PORT = Number(process.env.PORT1) || 8181;
const WS_PORT = Number(process.env.PORT2) || 8080;

httpServer.listen(HTTP_PORT, () => {
  const address = httpServer.address();
  let host;

  if (
    typeof address !== "string" &&
    address?.address &&
    address.address !== "::"
  ) {
    host = address.address;
  } else {
    host = "localhost";
  }

  console.log(`Start static http server http://${host}:${HTTP_PORT}`);
});

const wsServer = new WebSocketServer({ port: WS_PORT }, () => {
  const address = wsServer.address();
  let host;

  if (
    typeof address !== "string" &&
    address?.address &&
    address.address !== "::"
  ) {
    host = address.address;
  } else {
    host = "localhost";
  }

  console.log(`Start WebSocket server ${host}:${WS_PORT}`);
});

wsServer.on("connection", webSocketConnection);

process.on("SIGINT", () => {
  wsServer.close();
  wsServer.clients.forEach((client) => {
    client.close();
  });

  httpServer.close();
  httpServer.closeAllConnections();
  console.log("\nStop http server\nStop WebSocket server");
  process.exit();
});
