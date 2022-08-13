import { connect } from "./sockClient";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1> wsClient </h1>
    <span id="status">Offline</span>    
    
    <ul id="list">
      <li></li>
    </ul>
  </div>
`;

connect();
