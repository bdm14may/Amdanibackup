
import { List, Map } from 'immutable';

export interface Iuser {
    id?: number;
    name?: string;
    mobileno?: number;
    image?: string;
    islogin?: boolean;
    password?: string;
    loading?: boolean;
    display?: boolean;
    mobileNumber?: string;
    State_Name?: string;
    Dist_Name?: string;
    Taluka_name?: string;
    Village_name?: string;
    Active_crope_Ad?: string;
    User_Reg?: string;
    Last_Active?: string;
    Home_Lat?: number;
    Home_Lang?: number;
    token?: string;
    Name?: number;
    Language?:string;

}

export interface UsersState {
    Iusers: Iuser[]
};

// Create our reducer that will handle changes to the state
export const UsersState = (state: any = [], { type, payload }) => {
    switch (type) {
        case 'ADD_USER':
            return payload;
        case 'CREATE_USER':
            return [...state, payload];
        case 'UPDATE_USER':
            return state.map(campaign => {
                console.log(campaign,"CREATE_USER");
                return  Object.assign({}, campaign, payload);
            });
        case 'DELETE_USER':
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default:
            return state;
    }
}




