import { Manager } from "socket.io-client";

const URI = "http://localhost:3000/socket.io/socket.io.js";

export const connect = () => {
	const ioManager = new Manager(URI);

	const socket = ioManager.socket("/");
};
