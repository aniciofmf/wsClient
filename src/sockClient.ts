import { Manager, Socket } from "socket.io-client";

const URI = "http://localhost:3000/socket.io/socket.io.js";

export const connect = () => {
	const ioManager = new Manager(URI);

	const socket = ioManager.socket("/");

	statusListener(socket);
};

const statusListener = (socket: Socket) => {
	const statusLabel = document.querySelector("#status");

	socket.on("connect", () => {
		statusLabel!.innerHTML = "Connected";
	});

	socket.on("disconnect", () => {
		statusLabel!.innerHTML = "Disconnected";
	});

	socket.on("clients:updated", (ids: string[]) => {});
};
