import mongoose from "mongoose";
const Schema = mongoose.Schema;

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        // creator: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // }
    },
    { timestamps: true }
);

export default mongoose.model('Article', articleSchema);
// module.exports = mongoose.model('Article', articleSchema);