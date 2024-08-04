import io from "socket.io-client";

const SOCKET_SERVER_URL = "https://editor-server-4yde.onrender.com";

const socket = io(SOCKET_SERVER_URL);

export default socket;