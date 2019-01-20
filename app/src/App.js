import React from "react";

import store from "./store";
import { Provider, connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./landing/Landing";
import LoginContainer from "./login/LoginContainer";
import QuestionListContainer from "./questions/list/QuestionListContainer";
import CreateQuestionContainer from "./questions/create/CreateQuestionContainer";
import SingleQuestionContainer from "./questions/single/SingleQuestionContainer";
import QuestionEditDialog from "./modals/question/QuestionEditDialog";
import AnswerEditDialog from "./modals/answer/AnswerEditDialog";
import RegisterContainer from "./register/RegisterContainer";
import ErrorDialog from "./modals/error/ErrorDialog";
import Activate from "./register/Activate";
import DefaultToastContainer from "./modals/toast/DefaultToastContainer";
import PreferencesContainer from "./preferences/PreferencesContainer";

const Home = connect(state => state.token)(({token}) => token ? <QuestionListContainer /> : <Landing />)

const App = () => (
    <Provider store={store}>
        <div>
            <Router>
                <Switch>
                    <Route key="login" path="/login" exact={true} component={LoginContainer} />
                    <Route key="register" path="/register" exact={true} component={RegisterContainer} />
                    <Route key="activate" path="/activate/:token" exact={true} component={Activate} />
                    <Route key="preferences" path="/preferences" exact={true} component={PreferencesContainer} />
                    <Route key="create-question" path="/questions/new" exact={true} component={CreateQuestionContainer} />
                    <Route key="single-question" path="/questions/:id" exact={true} component={SingleQuestionContainer} />
                    <Route key="landing" exact={false} component={Home} />
                </Switch>
            </Router>
            <QuestionEditDialog />
            <AnswerEditDialog />
            <ErrorDialog />
            <DefaultToastContainer />
        </div>
    </Provider>
);

export default App;
