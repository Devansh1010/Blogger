import { Schema } from "mongoose";

export interface IFollowers {
    _id?: Schema.Types.ObjectId
    follower: Schema.Types.ObjectId
    following: Schema.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}