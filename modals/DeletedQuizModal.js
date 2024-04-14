import mongoose from 'mongoose';

const deletedQuizModal = mongoose.Schema({
        subject:{
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        questions: {
            type: [
                {
                    question: String,
                    options: [String],
                    correct: String,
                    explanation: String
                }
            ],
            required: true,
        },
        questionsCount:{
            type:Number,
            required:true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        tags: {
            type: [String],
        },
        difficulty: {
            type: String,
            required: true,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isAnonymous :{
            type:Boolean,
            default:false,
        },
        deletedBy: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,

    })

const DeletedQuiz = mongoose.models.DeletedQuizzes || mongoose.model('DeletedQuizzes', deletedQuizModal);

export default DeletedQuiz;
