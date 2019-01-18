
import { connect } from "react-redux";
import { compose, setDisplayName, withProps } from "recompose";

import CreateAnswer from "./CreateAnswer";
import store from "../../store";

const change = answer => store.dispatch({ type: "QUESTION_SINGLE_ANSWER_CHANGE", answer });

export default compose(
    setDisplayName("CreateAnswerContainer"),
    connect((state, ...props) => ({ ...props, text: state.questions.single.answer })),
    withProps({ onChange: change })
)(CreateAnswer);