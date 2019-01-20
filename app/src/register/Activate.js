import React, { Component } from "react";
import { activateAccount } from "../api/users";

export default class Activate extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
        this.activate();
    }

    activate() {
        activateAccount(this.props.match.params.token)
            .then(() => this.setState({loading: false, success: true}))
            .catch(() => this.setState({loading: false, success: false}));
    }

    render() {
        return (
            <div className="container" style={{textAlign: "center"}}>
                {
                    this.state.loading ? 
                        <div className="spinner"></div> :
                    this.state.success ? 
                        <p><mark className="tertiary">
                            Your account was successfully activated. You can login from <a href="#/login">here</a>.
                        </mark></p> :
                        <p><mark className="secondary">
                            There was an issue while activating your account. Please try again later.
                        </mark></p>
                }
            </div>
        );
    }
    
}