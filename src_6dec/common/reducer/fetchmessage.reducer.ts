
export interface message {
    name: string;
    token: string;
    totalBanners: number;
    activeBanners: number;
}

export interface AppStore1 {
    messages: message[];
}

export const messages = (state: any = [], { type, payload }) => {
    switch (type) {
        case 'ADD_CAMPAIGNS1':
            return payload;
        case 'CREATE_CAMPAIGN':
            return [...state, payload];
        case 'UPDATE_CAMPAIGN':
            return state.map(campaign => {
                return campaign.token === payload.token ? Object.assign({}, campaign, payload) : campaign;
            });
        case 'DELETE_CAMPAIGN':
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default:
            return state;
    }
}
