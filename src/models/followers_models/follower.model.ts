import { IFollowers } from "@/types/followers";
import { model, models, Schema } from "mongoose";

const followerSchema = new Schema<IFollowers>({

    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    following: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

//unique pair of document
followerSchema.index(
    {
        follower: 1,
        following: 1,
    },
    {
        unique: true,
    }
);

followerSchema.index({ following: 1 });

followerSchema.index({ follower: 1 });


const Follower = models.Follower || model<IFollowers>('Follower', followerSchema);

export default Follower