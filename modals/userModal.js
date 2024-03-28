import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        minlength: 8 // Minimum password length
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    bio: {
        type: String
    },

    location: {
        type: String
    },

    socialMedia: {
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    extraInfo: {
        type: [String]
    }
}, {
    timestamps: true
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
