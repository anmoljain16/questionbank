import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 8 // Minimum password length
    },
    avatar: {
        type: String
    },
    bio: {
        type: String
    },
    location: {
        type: String
    },
    interests: {
        type: [String]
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    adminType: {
        type: String,
        default: 'user'
    },
    geminiApiKey: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdQuizzes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Quiz'
    },
    likedQuizzes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Quiz'
    },
    likedQuestions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question'
    },
    likedComments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment'
    },
    reportedQuizzes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Quiz'
    },
    reportedQuestions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question'
    },
    reportedComments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment'
    },



}, {
    timestamps: true

})

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
