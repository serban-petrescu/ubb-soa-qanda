import { connect } from "react-redux";
import { compose, setDisplayName, withProps } from "recompose";

import TextEditModal from "../TextEditModal";
import store from "../../store";
import { updateQuestion } from "../../api/questions";
import { openModalForError } from "../modals";

const update = (questionId, text) => updateQuestion(questionId, text)
    .then(() => {
        store.dispatch({ type: "UPDATE_QUESTION_TEXT_RECEIVE", questionId, text });
        store.dispatch({ type: "MODALS_QUESTION_CLOSE" });
    }).catch(openModalForError);

export default compose(
    setDisplayName("QuestionEditDialog"),
    connect(state => state.modals.question),
    withProps(({ questionId, text }) => ({
        title: "Edit Question",
        onChange: text => store.dispatch({ type: "MODALS_QUESTION_TEXT_CHANGE", text }),
        onClose: () => store.dispatch({ type: "MODALS_QUESTION_CLOSE" }),
        onSave: () => update(questionId, text)
    }))
)(TextEditModal);