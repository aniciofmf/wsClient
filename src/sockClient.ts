import { Manager, Socket } from "socket.io-client";

const URI = "http://localhost:3000/socket.io/socket.io.js";

export const connect = () => {
	const ioManager = new Manager(URI);

	const socket = ioManager.socket("/");

	statusListener(socket);
};

const statusListener = (socket: Socket) => {
	const statusLabel = document.querySelector<HTMLSpanElement>("#status")!;
	const clientsListLabel = document.querySelector<HTMLUListElement>("#list")!;
	const msgform = document.querySelector<HTMLFormElement>("#msgform")!;
	const msg = document.querySelector<HTMLInputElement>("#msg")!;
	let clientId: string | null = null;

	socket.on("connect", () => {
		statusLabel!.innerHTML = "Connected";
		clientId = socket.id;
	});

	socket.on("disconnect", () => {
		statusLabel!.innerHTML = "Disconnected";
		clientId = null;
	});

	socket.on("clients:updated", (ids: string[]) => {
		let clsHtml: string = "";

		ids.forEach((id) => {
			clsHtml += `
            <li>${id}</li>`;
		});

		clientsListLabel.innerHTML = clsHtml;
	});

	msgform?.addEventListener("submit", (ev) => {
		ev.preventDefault();

		if (msg.value.trim().length > 0) {
			socket.emit("clients:msg", {
				id: clientId,
				msg: msg.value,
			});

			msg.value = "";
		}
	});
};
