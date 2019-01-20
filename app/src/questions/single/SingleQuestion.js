import React from "react";
import PropTypes from "prop-types";

import parse from "react-html-parser";
import Menu from "../../Menu";

import "./SingleQuestion.scss";
import CreateAnswerContainer from "./CreateAnswerContainer";
import Vote from "./Vote";

const SingleQuestion = ({ id: questionId, title, text, user, time, editable, answers, loading,
    onAnswer, onVote, onUnVote, onEditAnswer, onEditQuestion }) => (
        <div>
            <Menu />
            <div className="container">
                {
                    loading ? <div style={{ textAlign: "center" }}><div className="spinner" /></div> :
                        <div>
                            <h3>
                                {title}
                                <small>by <strong>{user}</strong> @ <em>{time}</em>
                                    {
                                        editable && <span> | <span className="icon-edit question-edit-icon"
                                            onClick={() => onEditQuestion(questionId, text)}></span></span>
                                    }
                                </small>
                            </h3>
                            <div className="question-text">
                                {
                                    parse(text)
                                }
                            </div>
                            <hr className="question-separator" />
                            <div className="answer-container">
                                {
                                    (answers || []).map(({ user, text, time, id: answerId, vote, editable }) => (
                                        <div key={answerId}>
                                            <div>
                                                <Vote {...vote} onVote={positive => onVote(answerId, positive)} 
                                                    onUnVote={() => onUnVote(answerId)} />
                                                <div style={{ display: "inline-block" }}>
                                                    <small>
                                                        <strong>{user}</strong> @ <em>{time}</em>
                                                        {
                                                            editable && <span> | <span className="icon-edit question-edit-icon"
                                                                onClick={() => onEditAnswer(questionId, answerId, text)}></span></span>
                                                        }
                                                    </small>
                                                </div>
                                                <div>
                                                    {
                                                        parse(text)
                                                    }
                                                </div>
                                            </div>
                                            <hr className="question-separator" />
                                        </div>
                                    ))
                                }
                                <CreateAnswerContainer onSubmit={onAnswer} />
                            </div>
                        </div>
                }
            </div>
        </div>
    );

SingleQuestion.propTypes = {
    editable: PropTypes.bool,
    title: PropTypes.string,
    text: PropTypes.string,
    time: PropTypes.string,
    user: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.shape({
        editable: PropTypes.bool,
        id: PropTypes.string,
        text: PropTypes.string,
        time: PropTypes.string,
        user: PropTypes.string,
        vote: PropTypes.shape({
            votes: PropTypes.number,
            voted: PropTypes.bool,
            positive: PropTypes.bool
        })
    })),
    onVote: PropTypes.func,
    onAnswer: PropTypes.func,
    onUnVote: PropTypes.func,
    onEditAnswer: PropTypes.func,
    onEditQuestion: PropTypes.func
};

export default SingleQuestion;