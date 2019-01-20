
import { connect } from "react-redux";
import { compose, setDisplayName, withProps, lifecycle } from "recompose";

import store from "../../store";
import CreateQuestion from "./CreateQuestion";
import { createQuestion } from "../../api/questions";
import { openModalForError } from "../../modals/modals";

const getState = (state = store.getState()) => state.questions.create;

const change = (property, value) => store.dispatch({type: "QUESTION_CREATE_CHANGE", property, value});
const init = () => store.dispatch({type: "QUESTION_CREATE_INIT"});

const onSubmit = () => {
    const data = getState();
    if (data && data.text && data.title && data.text.trim() && data.title.trim()) {
        createQuestion(data).then(data => {
            store.dispatch({type: "QUESTION_SINGLE_RECEIVE", data: {...data, answers: {}}});
            window.location.assign("#/questions/" + data._id);
        }).catch(openModalForError);
    } else {
        change("error", "Both the text and the title are mandatory! Please try again.");
    }
}

export default compose(
    setDisplayName("LoginContainer"),
    withProps({
        onChangeTitle: value => change("title", value),
        onChangeText: value => change("text", value),
        onSubmit
    }),
    connect((state, props) => ({...getState(state), ...props})),
    lifecycle({ componentDidMount: init })
)(CreateQuestion);