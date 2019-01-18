import moment from "moment";
import { connect } from "react-redux";
import { compose, setDisplayName, withProps, lifecycle } from "recompose";

import store from "../../store";
import QuestionList from "./QuestionList";
import { readPage } from "../../api/questions";
import { arrayToMap, mapToArray } from "../../utils";

const init = () => store.dispatch({type: "QUESTION_LIST_INIT"});
const getState = (state = store.getState()) => state.questions.list;
const compare = (a, b) => (b.created || "").localeCompare(a.created);
const mapQuestion = ({ title, userId, created, _id }) => ({ created, title, user: userId, id: _id, time: moment(created).fromNow() });

const mapStateToProps = (state, props) => {
    const { questions, ...other } = getState(state);
    return { ...other, ...props, questions: mapToArray(questions, mapQuestion).sort(compare) };
}

const loadMore = () => readPage((Object.keys(getState().questions || {})).length)
    .then(questions => store.dispatch({type: "QUESTION_LIST_RECEIVE", questions: arrayToMap(questions, "_id")}));

export default compose(
    setDisplayName("QuestionListContainer"),
    connect(mapStateToProps),
    withProps({ loadMore }),
    lifecycle({ componentDidMount: init })
)(QuestionList);