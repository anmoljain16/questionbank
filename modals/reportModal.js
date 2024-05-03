import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

    reportType: {
        type: String,
        required: true,
    },
    reportDescription: {
        type: String,
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    isResolved: {
        type: Boolean,
        default: false,
    },
    resolvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    resolvedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})
