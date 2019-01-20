
import React from "react";
import PropTypes from "prop-types";

const ErrorModal = ({ open, text, onClose }) => (
    <div>
        <input type="checkbox" className="modal" checked={open} onChange={() => { }} />
        <div>
            <div className="card text-edit-card">
                <label className="modal-close" onClick={onClose}></label>
                <h3 className="section">Error</h3>
                <p className="section">
                    <mark className="secondary">{text}</mark>
                </p>
            </div>
        </div>
    </div>
);

ErrorModal.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    open: PropTypes.bool,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onSave: PropTypes.func
};

export default ErrorModal;