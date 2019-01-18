import React from "react";
import PropTypes from "prop-types";

import parse from "react-html-parser";
import Menu from "../../Menu";

import "./SingleQuestion.scss";
import CreateAnswerContainer from "./CreateAnswerContainer";

const SingleQuestion = ({title, text, user, time, answers, onAnswer}) => (
    <div>
        <Menu />
        <div className="container">
            <h3>{ title }<small>by <strong>{user}</strong> @ <em>{time}</em></small></h3>
            <div className="question-text">
            {
                parse(text)
            }
            </div>
            <hr className="question-separator" />
            <div className="answer-container">
                {
                    (answers || []).map(({ user, text, time, id }) => (
                        <div key={id}>
                            <div>
                                <p>
                                    <small><strong>{user}</strong> @ <em>{time}</em></small>
                                    <br />
                                    {
                                        parse(text)
                                    }
                                </p>
                            </div>
                            <hr className="question-separator" />
                        </div>
                    ))
                }
                <CreateAnswerContainer onSubmit={onAnswer} />
            </div>
        </div>
    </div>
);

SingleQuestion.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    time: PropTypes.string,
    user: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        time: PropTypes.string,
        user: PropTypes.string
    }))
};

export default SingleQuestion;