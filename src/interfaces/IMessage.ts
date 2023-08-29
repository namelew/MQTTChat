import { IConversation } from "./IConversation";
import { IUser } from "./IUser";

export enum IMessageType {
    Error,
    Request,
    Response,
    Conversation,
};

export interface IMessage {
    id: number,
    type: IMessageType,
    sender: IUser,
    chat: IConversation,
    timestamp: Date,
    payload: string,
};