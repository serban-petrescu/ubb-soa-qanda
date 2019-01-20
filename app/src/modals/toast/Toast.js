import React from "react";
import PropTypes from "prop-types";

import "./Toast.scss";

const Toast = ({text, open}) => (
    <div className="toast default-toast" style={{display: open ? "" : "none"}}>
        { text }
    </div>
)

Toast.propTypes = {
    text: PropTypes.string,
    open: PropTypes.bool
}

export default Toast;