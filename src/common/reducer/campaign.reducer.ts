import { messages, AppStore1, message } from './fetchmessage.reducer';
import * as userred from './luser.reducer';
import * as IweatherState from './weather.reducer';
export interface Campaign {
    name: string;
    token: string;
    totalBanners: number;
    activeBanners: number;    
}

export interface AppStore {
    campaigns: Campaign[];
    messages: message[];
    UsersState: userred.Iuser[];
    IweatherState: IweatherState.Iweather;
}

export const campaigns = (state: any = [], {type, payload}) => {
    switch (type) {
        case 'LOAD_STARTED':
            return payload;

        case 'LOAD_SUCCESS':
            return payload;
        case 'FAILED':
            return payload;

        case 'ADD_CAMPAIGNS':
            return payload;
        case 'CREATE_CAMPAIGN': 
            return [...state, payload];
        case 'UPDATE_CAMPAIGN':
            return state.map(campaign => {
                return campaign.token === payload.token ? Object.assign({}, campaign, payload): campaign;
            });
        case 'DELETE_CAMPAIGN': 
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default: 
            return state;
    }
}
