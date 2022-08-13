import { connect } from "./sockClient";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2> wsClient </h2>

    <input id="token" placeholder="Place your token" />
    <button id="connect">Send</button>

    <br/><br/>

    <span id="status">Offline</span>    
    
    <ul id="list">
    </ul>

    <form id="msgform">
      <input placeholder="msg" id="msg" />
    </form>

    <h3>Msgs</h3>
    <ul id="msglist"></ul>

  </div>
`;

const token = document.querySelector<HTMLInputElement>("#token");
const btnConnect = document.querySelector<HTMLButtonElement>("#connect");

if (btnConnect)
	btnConnect.addEventListener("click", () => {
		if (token!.value.trim().length > 0) {
			connect(token!.value);
		}
	});
