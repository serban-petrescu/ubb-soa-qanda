import { connect } from "react-redux";
import { compose, setDisplayName, withProps } from "recompose";

import ErrorModal from "./ErrorModal";
import store from "../../store";

export default compose(
    setDisplayName("ErrorDialog"),
    connect(state => state.modals.error),
    withProps({
        onClose: () => store.dispatch({type: "MODALS_QUESTION_CLOSE"})
    })
)(ErrorModal);