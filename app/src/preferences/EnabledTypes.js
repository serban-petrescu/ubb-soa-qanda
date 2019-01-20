import React from "react";
import PropTypes from "prop-types";

const EnabledTypes = ({ title, children, questionAnswered, questionUpdated, answerUpdated, onChange }) => (
    <form>
        <legend>{title}</legend>
        <fieldset>
            {children}
            
            <div className="row responsive-label">
                <div className="col-sm-12 col-md-3"><label>Question Answered</label></div>
                <div className="col-sm-12 col-md">
                    <input type="checkbox" autoComplete="off" checked={questionAnswered || false}
                        onChange={e => onChange("questionAnswered", e.target.checked)} />
                </div>
            </div>
            
            <div className="row responsive-label">
                <div className="col-sm-12 col-md-3"><label>Question Updated</label></div>
                <div className="col-sm-12 col-md">
                    <input type="checkbox" autoComplete="off" checked={questionUpdated || false}
                        onChange={e => onChange("questionUpdated", e.target.checked)} />
                </div>
            </div>
            
            <div className="row responsive-label">
                <div className="col-sm-12 col-md-3"><label>Answer Updated</label></div>
                <div className="col-sm-12 col-md">
                    <input type="checkbox" autoComplete="off" checked={answerUpdated || false}
                        onChange={e => onChange("answerUpdated", e.target.checked)} />
                </div>
            </div>
        </fieldset>
    </form>
);

EnabledTypes.propTypes = {
    title: PropTypes.string, 
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    questionAnswered: PropTypes.bool, 
    questionUpdated: PropTypes.bool, 
    answerUpdated: PropTypes.bool, 
    onChange: PropTypes.func
};

export default EnabledTypes;