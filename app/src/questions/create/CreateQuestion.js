import React from "react";
import PropTypes from "prop-types";

import ReactQuill from "react-quill";
import "./CreateQuestion.scss";
import Menu from "../../Menu";

const CreateQuestion = ({ title, text, error, onChangeTitle, onChangeText, onSubmit }) => (
    <div>
        <Menu />
        <div className="container">
            <form className="create-question-form">
                <fieldset>
                    <legend>Ask a question</legend>

                    <div className="row responsive-label">
                        <div className="col-sm-12 col-md-3"><label>Title</label></div>
                        <div className="col-sm-12 col-md">
                            <input type="text" placeholder="Title" value={title} style={{ width: "85%" }}
                                onChange={e => onChangeTitle(e.target.value)} />
                        </div>
                    </div>

                    <div className="row responsive-label">
                        <div className="col-sm-12 col-md-3"><label>Text</label></div>
                        <div className="col-sm-12 col-md">
                            <ReactQuill theme="snow" value={text} onChange={onChangeText} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md col-md-offset-3">
                            {
                                error ? <p><mark className="secondary">{error}</mark></p> : <span />
                            }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md col-md-offset-3">
                            <button className="button primary" style={{ minWidth: "13em" }}
                                onClick={e => { onSubmit(); e.preventDefault(); }}>
                                Ask
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
);

CreateQuestion.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    error: PropTypes.string,
    onChangeText: PropTypes.func,
    onChangeTitle: PropTypes.func,
    onSubmit: PropTypes.func
};

export default CreateQuestion;