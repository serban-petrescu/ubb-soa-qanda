import { connect } from "react-redux";
import { compose, setDisplayName, withProps, lifecycle } from "recompose";

import store from "../store";
import Preferences from "./Preferences";
import { readPreferences, upsertPreferences } from "../api/preferences";
import { openModalForError, toast } from "../modals/modals";

const init = () => {
    store.dispatch({ type: "PREFERENCES_INIT" });
    readPreferences()
        .then(data => store.dispatch({type: "PREFERENCES_RECEIVE", data}))
        .catch(openModalForError);
};

const save = () => {
    upsertPreferences(store.getState().preferences)
        .then(data => {
            store.dispatch({type: "PREFERENCES_RECEIVE", data});
            toast("Your settings were successfully updated!");
        }).catch(openModalForError);
}

export default compose(
    setDisplayName("PreferencesContainer"),
    lifecycle({ componentDidMount: init }),
    connect(state => state.preferences),
    withProps({
        onChangeEmailAddress: value => store.dispatch({ type: "PREFERENCES_UPDATE_PROPERTY", property: "emailAddress", value }),
        onChangePush: (flag, value) => store.dispatch({ type: "PREFERENCES_UPDATE_FLAG", group: "push", flag, value }),
        onChangeEmail: (flag, value) => store.dispatch({ type: "PREFERENCES_UPDATE_FLAG", group: "email", flag, value }),
        onSave: save
    })
)(Preferences);