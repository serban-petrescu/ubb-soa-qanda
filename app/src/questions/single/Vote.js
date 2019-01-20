import React from "react";
import PropTypes from "prop-types";

import "./Vote.scss";

const Vote = ({votes, voted, positive, onVote, onUnVote}) => (
    <div style={{display: "inline-block", marginRight: "0.5em"}}>
        <div className={"arrow-up " + (voted && positive ? " tertiary" : "inverse")}
            onClick={voted && positive ? onUnVote : () => onVote(true)}></div>
        <div style={{textAlign: "center"}}>{ votes || "0" }</div>
        <div className={"arrow-down " + (voted && !positive ? " secondary" : "inverse")}
            onClick={voted && !positive ? onUnVote : () => onVote(false)}></div>
    </div>
);

Vote.propTypes = {
    votes: PropTypes.number,
    voted: PropTypes.bool,
    positive: PropTypes.bool,
    onVote: PropTypes.func,
    onUnVote: PropTypes.func
}

export default Vote;