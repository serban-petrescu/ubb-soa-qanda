import React from "react";
import { logout } from "./token/store";

const Menu = () => (
    <header className="sticky">
        <a href="#/" className="logo">Q &amp; A</a>
        <button onClick={logout} className="button" style={{float: "right"}}><span className="icon-lock"></span></button>
        <a href="#/preferences" className="button" style={{float: "right"}}><span className="icon-settings"></span></a>
    </header>
);

export default Menu;