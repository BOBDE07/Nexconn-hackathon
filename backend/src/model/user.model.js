import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please use a valid email address.'
        ]
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should be at least 6 characters long.'],
    },

    avatarURL: {
        type: String,
        default: ''
    },

}, { timestamps: true });


// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});


// Compare password
userSchema.methods.isPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


export const User = mongoose.model('User', userSchema);
