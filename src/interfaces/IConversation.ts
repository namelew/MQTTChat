import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export enum IConversationType {
    Group,
    OneToOne,
};

export interface IConversation {
    id: string,
    name: string,
    type: IConversationType,
    participants?: IUser[],
    messages?: IMessage[],
};