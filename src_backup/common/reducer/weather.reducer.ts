
import { List, Map } from 'immutable';

export interface Iweather {
    id?: number;
    name?: string;
    lat?: number;
    lang?: number;
    time?: number,
    Hgeo?: string,
    size?: number,
    summary?:string,
     icon?: string,
    precipType?: string,
   temperature?: number,
    landdetails?: {
        lat?: number;
        lang?: number;
    };
}

export interface IweatherState {
    Iweather: Iweather[]
};

export const IweatherState = (state: any = [], { type, payload }) => {
    switch (type) {
        case 'ADD_DETAILS':
            return payload;
        case 'CREATE_DETAILS':
            return [...state, payload];
        case 'UPDATE_DETAILS':
            return state.map(campaign => {
                return  Object.assign({}, campaign, payload);
            });
        case 'DELETE_DETAILS':
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default:
            return state;
    }
}




