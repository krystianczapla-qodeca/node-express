import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        // user / admin
        // posts: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Article'
        //     }
        // ]
    }
);

export default mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema);