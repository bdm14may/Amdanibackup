export interface AppState {
    id: string;
    name: string;
    avatarSrc: string;
    isClient?: boolean;
};

export interface MessageState {
    message:string
}