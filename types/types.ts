import { Document } from "mongoose";

export interface IAdmin extends Document {
    email: string;
    posts: IPost[];
}

export interface IPost extends Document {
    title: string;
    content: string;
    slug: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IApiResponse {
    sucess: boolean;
    data?: IPost | IPost[];
    status: number
}

export interface ICardProp {
    title: string;
    content: string;
    createdAt?: string;
    slug?: string;
}

export interface IPostData {
    title: string;
    content: string;
    createdAt?: string;
    slug?: string;
}