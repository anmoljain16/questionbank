import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    quizzes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Quiz',
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
    },
})

const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);

export default Tag;
