import {
    Action,
    ActionCreator
} from 'redux';
import { AppState,MessageState } from '../models/app.state';

export interface SetCurrentUserAction extends Action {
    user: AppState;
}

export const INCREMENT: string = 'INCREMENT';
export const increment: ActionCreator<Action> = () => ({
    type: INCREMENT
});

export const DECREMENT: string = 'DECREMENT';
export const decrement: ActionCreator<Action> = () => ({
    type: DECREMENT
});

export interface SetCurrentUserAction1 extends Action {
    message: MessageState;
}
export const MESSAGE: string = 'MESSAGE';
export const message: ActionCreator<SetCurrentUserAction> = (user) => ({
    type: MESSAGE,
    user

});


export const SETUSER: string = 'SETUSER';
export const setCurrentUser: ActionCreator<SetCurrentUserAction> =
    (user) => ({
        type: SETUSER,
        user: user
    });

