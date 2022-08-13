import { connect } from "./sockClient";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1> wsClient </h1>
    <span>Offline</span>    
  </div>
`;

connect();
