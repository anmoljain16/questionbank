import mongoose from 'mongoose';

const commentModal = new mongoose.Schema({
    comment:{
        type: String,
        required: true,
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    commentedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    likedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    reports: {
        type: Number,
        default: 0,
    },
    reportedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
},
    {
        timestamps: true
    }
);

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentModal);

export default Comment;
