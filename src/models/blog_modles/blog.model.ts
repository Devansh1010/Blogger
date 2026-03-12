import { models, Schema, model } from "mongoose";

interface EditorContent {
    time: number
    blocks: any[]
    version: string
}

interface IBlog {
    id?: Schema.Types.ObjectId,
    author: Schema.Types.ObjectId

    title: string,
    slug: string,
    content: EditorContent,
    excerpt?: string,

    coverImage?: string

    tags?: string[]

    isPublished: boolean
    publishedAt?: Date

    createdAt: Date,
    updatedAt: Date,
}

const blogSchema = new Schema<IBlog>({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    content: {
        type: Schema.Types.Mixed,
        required: true
    },

    excerpt: String,

    coverImage: String,

    tags: [String],

    isPublished: {
      type: Boolean,
      default: false
    },

    publishedAt: Date

}, { timestamps: true })

const Blog = models.Blog || model<IBlog>('Blog', blogSchema)

export default Blog