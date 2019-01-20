import { connect } from "react-redux";
import { compose, setDisplayName } from "recompose";
import Toast from "./Toast";

export default compose(
    setDisplayName("DefaultToastContainer"),
    connect(state => state.modals.toast)
)(Toast);