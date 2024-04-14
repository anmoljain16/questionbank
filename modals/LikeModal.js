import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

export default Like;
