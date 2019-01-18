import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

import Menu from "../../Menu";

const QuestionList = ({ questions, hasMore, loadMore }) => (
    <div>
        <Menu />
        <div style={{height: "2.5rem"}}>
            <a className="button small primary" href="#/questions/new" style={{float: "right", marginTop: 0}}>Add</a>
            <h3>Questions</h3>
        </div>
        <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMore} 
            loader={<div key="loader" style={{textAlign: "center"}}><div className="spinner"></div></div>}>
            {
                (questions || []).map(({ user, title, time, id }) => (
                    <div className="card fluid" key={id}>
                        <div>
                            <p>
                                <small><strong>{user}</strong> @ <em>{time}</em></small>
                                <br />
                                <a href={"#/questions/" + id}>{title}</a>
                            </p>
                        </div>
                    </div>
                ))
            }
        </InfiniteScroll>
    </div>
);

QuestionList.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any,
        title: PropTypes.string,
        time: PropTypes.string,
        user: PropTypes.string
    })),
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func
};

export default QuestionList;