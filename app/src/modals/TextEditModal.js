
import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

import "./TextEditModal.scss";

const TextEditModal = ({ title, open, text, onChange, onClose, onSave }) => (
    <div>
        <input type="checkbox" className="modal" checked={open} onChange={() => {}}/>
        <div>
            <div className="card text-edit-card">
                <label className="modal-close" onClick={onClose}></label>
                <h3 className="section">{title}</h3>
                <ReactQuill value={text} onChange={onChange} />
                <button className="primary" onClick={onSave}>Save</button>
            </div>
        </div>
    </div>
);

TextEditModal.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    open: PropTypes.bool,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onSave: PropTypes.func
};

export default TextEditModal;