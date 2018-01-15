import {
    Action,
    ActionCreator
} from 'redux';
import { Iuser } from '../models/user.state';

export interface setUaction extends Action {
    Users: Iuser ;
}

export const INIT: string = 'INIT';
export const init: ActionCreator<Action> = (value:string) => ({
    type: INIT,
    value
});

export const LOGIN: string = 'LOGIN';
export const login: ActionCreator<Action> = (value: string) => ({
    type: LOGIN,
    value
});

export const UPDATEU: string = 'UPDATEU';
export const updateu: ActionCreator<Action> = (value: object) => ({
    type: UPDATEU,
    value
});

export const LOGOUT: string = 'LOGOUT';
export const logout: ActionCreator<Action> = (value: object) => ({
    type: LOGOUT,
    value
});


