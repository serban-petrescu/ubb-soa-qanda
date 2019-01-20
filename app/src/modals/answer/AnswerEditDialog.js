import { connect } from "react-redux";
import { compose, setDisplayName, withProps } from "recompose";

import TextEditModal from "../TextEditModal";
import store from "../../store";
import { updateAnswer } from "../../api/questions";
import { openModalForError } from "../modals";

const update = (questionId, answerId, text) => updateAnswer(questionId, answerId, text)
    .then(() => {
        store.dispatch({ type: "UPDATE_ANSWER_TEXT_RECEIVE", questionId, answerId, text });
        store.dispatch({ type: "MODALS_ANSWER_CLOSE" });
    }).catch(openModalForError);

export default compose(
    setDisplayName("AnswerEditDialog"),
    connect(state => state.modals.answer),
    withProps(({questionId, answerId, text}) => ({
        title: "Edit Answer",
        onChange: text => store.dispatch({ type: "MODALS_ANSWER_TEXT_CHANGE", text }),
        onClose: () => store.dispatch({ type: "MODALS_ANSWER_CLOSE" }),
        onSave: () => update(questionId, answerId, text)
    }))
)(TextEditModal);