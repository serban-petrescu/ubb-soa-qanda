import React from "react";

import store from "./store";
import { Provider, connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./landing/Landing";
import LoginContainer from "./login/LoginContainer";
import QuestionListContainer from "./questions/list/QuestionListContainer";
import CreateQuestionContainer from "./questions/create/CreateQuestionContainer";
import SingleQuestionContainer from "./questions/single/SingleQuestionContainer";

const Home = connect(state => state.token)(({token}) => token ? <QuestionListContainer /> : <Landing />)

const App = () => (
    <Provider store={store}>
        <div>
            <Router>
                <Switch>
                    <Route key="login" path="/login" exact={true} component={LoginContainer} />
                    <Route key="create-question" path="/questions/new" exact={true} component={CreateQuestionContainer} />
                    <Route key="single-question" path="/questions/:id" exact={true} component={SingleQuestionContainer} />
                    <Route key="landing" exact={false} component={Home} />
                </Switch>
            </Router>
        </div>
    </Provider>
);

export default App;
