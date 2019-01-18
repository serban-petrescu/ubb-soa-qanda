import moment from "moment";
import { connect } from "react-redux";
import { compose, setDisplayName, lifecycle, withProps } from "recompose";

import store from "../../store";
import { readSingle, answerQuestion } from "../../api/questions";
import { arrayToMap, mapToArray } from "../../utils";
import SingleQuestion from "./SingleQuestion";

const compare = (a, b) => (b.created || "").localeCompare(a.created);
const getState = (state = store.getState()) => state.questions.single;
const processData = ({answers, ...question}) => ({...question, answers: arrayToMap(answers || [], "_id")}); 

const mapQuestion = ({ title, text, userId, created, _id, answers }) => ({
    created, 
    title,
    text,
    user: userId, 
    id: _id, 
    time: moment(created).fromNow(),
    answers: mapToArray(answers, mapAnswer).sort((a, b) => -compare(a, b))
});

const mapAnswer = ({ _id, text, userId, created }) => ({
    id: _id,
    created,
    text,
    user: userId,
    time: moment(created).fromNow()
})

const init = id => {
    store.dispatch({type: "QUESTION_SINGLE_INIT"});
    readSingle(id)
        .then(data => store.dispatch({type: "QUESTION_SINGLE_RECEIVE", data: processData(data)}));
};

const mapStateToProps = (state, props) => ({ ...props, ...mapQuestion(getState(state)) });

export default compose(
    setDisplayName("SingleQuestionContainer"),
    connect(mapStateToProps),
    withProps(({id}) => ({
        onAnswer: text => answerQuestion(id, text).then(() => init(id))
    })),
    lifecycle({ 
        componentDidMount() {
            init(this.props.match.params.id);
        },
    
        componentDidUpdate(prevProps) {
            if (this.props.match.params.id !== prevProps.match.params.id && this.props.match.params.id !== prevProps.id) {
                init(this.props.match.params.id);
            }
        }
    })
)(SingleQuestion);