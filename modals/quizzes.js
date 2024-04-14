import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },



}, { timestamps: true });

const Quiz = mongoose.models.quizzes || mongoose.model('quizzes', quizSchema);

export default Quiz;
