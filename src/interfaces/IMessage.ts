import { IConversation } from "./IConversation";
import { IUser } from "./IUser";

export enum IMessageType {
    Error,
    Login,
    Logout,
    Conversation,
    Success,
};

export interface IMessage {
    id: number,
    type: IMessageType,
    sender: IUser,
    chat: IConversation,
    timestamp: string, // no formato ISO
    payload: string,
};