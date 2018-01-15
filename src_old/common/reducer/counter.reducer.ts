import { Reducer, Action } from 'redux';
import { createSelector } from 'reselect';


import { AppState, MessageState } from '../models/app.state';
import {
    INCREMENT,
    DECREMENT,
    MESSAGE,
    SetCurrentUserAction,
    setCurrentUser,
    SETUSER,
    SetCurrentUserAction1

} from '../action/counter.action';



export interface UsersState {
    currentUser?: AppState;
    cmessage?: MessageState;
};

const initialState: UsersState = {
    currentUser: null
};
// Create our reducer that will handle changes to the state
export const counterReducer: Reducer<UsersState> =
    (state: UsersState = initialState, action: Action): UsersState => {
        switch (action.type) {
            case SETUSER:
                const user1: AppState = (<SetCurrentUserAction>action).user;
                return {
                    currentUser: user1
                };
            default:
                return state;
        }
    };

export const getUsersState = (state): UsersState => state.users;

export const getCurrentUser = createSelector(
    getUsersState,
    (state: UsersState) => state.currentUser);