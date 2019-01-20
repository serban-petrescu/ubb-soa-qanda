import moment from "moment";
import { connect } from "react-redux";
import { compose, setDisplayName, lifecycle, withProps } from "recompose";

import store from "../../store";
import { readSingle, answerQuestion, voteAnswer, unVoteAnswer } from "../../api/questions";
import { arrayToMap, mapToArray } from "../../utils";
import SingleQuestion from "./SingleQuestion";
import { openEditAnswer, openEditQuestion, openModalForError } from "../../modals/modals";

const compare = (a, b) => (b.created || "").localeCompare(a.created);
const getState = (state = store.getState()) => state.questions.single;
const processData = ({answers, ...question}) => ({...question, answers: arrayToMap(answers || [], "_id")}); 


const init = id => {
    store.dispatch({type: "QUESTION_SINGLE_INIT"});
    readSingle(id)
        .then(data => store.dispatch({type: "QUESTION_SINGLE_RECEIVE", data: processData(data)}))
        .catch(openModalForError);
};

const mapStateToProps = (state, props) => {
    const currentUserId = state.token.payload.user_name;
    
    const mapQuestion = ({ title, text, userId, created, _id, answers }) => ({
        created, 
        title,
        text,
        user: userId, 
        id: _id, 
        time: moment(created).fromNow(),
        answers: mapToArray(answers, mapAnswer).sort((a, b) => -compare(a, b)),
        editable: userId === currentUserId
    });

    const mapAnswer = ({ _id, text, userId, created, votes }) => ({
        id: _id,
        created,
        text,
        user: userId,
        time: moment(created).fromNow(),
        vote: mapVotes(votes),
        editable: userId === currentUserId
    });

    const mapVotes = (votes = []) => {
        const currentVote = votes.find(v => v.userId === currentUserId);
        return {
            votes: votes.reduce((p, v) => p + (v.positive ? 1 : -1), 0),
            voted: !!currentVote,
            positive: currentVote ? currentVote.positive : false
        };
    };
    
    return { ...props, ...mapQuestion(getState(state)) }
};

const updateSingleAnswer = answer => store.dispatch({type: "QUESTION_SINGLE_RECEIVE_ANSWER", answer});

export default compose(
    setDisplayName("SingleQuestionContainer"),
    connect(mapStateToProps),
    withProps(({id}) => ({
        onAnswer: text => answerQuestion(id, text)
            .then(updateSingleAnswer)
            .then(() => store.dispatch({ type: "QUESTION_SINGLE_ANSWER_CHANGE", answer: "" }))
            .catch(openModalForError),
        onVote: (answerId, positive) => voteAnswer(id, answerId, positive).then(updateSingleAnswer).catch(openModalForError),
        onUnVote: answerId => unVoteAnswer(id, answerId).then(updateSingleAnswer).catch(openModalForError),
        onEditAnswer: openEditAnswer,
        onEditQuestion: openEditQuestion
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