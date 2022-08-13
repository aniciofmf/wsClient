import { Manager, Socket } from "socket.io-client";

const URI = "http://localhost:3000/socket.io/socket.io.js";

export const connect = (token: string) => {
	const ioManager = new Manager(URI, {
		extraHeaders: {
			authentication: token,
		},
	});

	const socket = ioManager.socket("/");

	setListeners(socket);
};

const setListeners = (socket: Socket) => {
	const statusLabel = document.querySelector<HTMLSpanElement>("#status")!;
	const clientsListLabel = document.querySelector<HTMLUListElement>("#list")!;
	const msgform = document.querySelector<HTMLFormElement>("#msgform")!;
	const msg = document.querySelector<HTMLInputElement>("#msg")!;
	const msgListLabel = document.querySelector<HTMLUListElement>("#msglist")!;

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

	socket.on("server:messages", (payload: { id: string; msg: string }) => {
		let htmlEl = document.createElement("li");

		htmlEl.innerHTML = `
        <strong>clientId: ${payload.id}</strong>
        <strong>Msg: ${payload.msg}</strong>
        `;

		msgListLabel.appendChild(htmlEl);
	});

	msgform?.addEventListener("submit", (ev) => {
		ev.preventDefault();

		if (msg.value.trim().length > 0) {
			socket.emit("clients:messages", {
				id: clientId,
				msg: msg.value,
			});

			msg.value = "";
		}
	});
};
