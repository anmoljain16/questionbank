import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    difficulty: {
        type: String,
        required: true,
    },
    questionsCount: {
           type: Number,
    },
    tags: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tag',
    },
    views: {
        type: Number,
        default: 0,
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


}, { timestamps: true });

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;
