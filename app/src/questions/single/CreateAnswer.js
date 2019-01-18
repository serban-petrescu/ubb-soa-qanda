import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

const CreateAnswer = ({ text, onChange, onSubmit }) => (
    <div>
        <ReactQuill theme="snow" value={text} onChange={onChange} />
        <div style={{textAlign: "right"}}>
            <button className="button primary" style={{ minWidth: "13em" }}
                onClick={e => { onSubmit(text); e.preventDefault(); }}>
                Answer
            </button>
        </div>
    </div>
);

CreateAnswer.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
};

export default CreateAnswer;