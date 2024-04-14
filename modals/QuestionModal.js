import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    subject:{
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correct: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    tags: {
        type:[String]
    },
    difficulty: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        default: 'en',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    views: {
        type: Number,
        default: 0,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },

    reportedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    commentedBy:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Comment',
    },
    commentCount:{
        type:Number,
        default:0,
    },
    likedBy:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
    },
    reports: {
        type: Number,
        default: 0,
    },


}, {
    timestamps: true,

})

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

export default Question;
