import React from "react";

const Menu = () => (
    <header>
        <a href="#/" className="logo">Q &amp; A</a>
        <a href="#/logout" className="button" style={{float: "right"}}><span className="icon-lock"></span></a>
        <a href="#/settings" className="button" style={{float: "right"}}><span className="icon-settings"></span></a>
    </header>
);

export default Menu;