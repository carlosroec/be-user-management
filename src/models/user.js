import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.ObjectId;
const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a full name'],
            index: true,
        },
        username: {
            type: String,
            required: [true, 'Please enter a username'],
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },
        password: String,
        salt: String,
        role: {
            type: String,
            default: 'user',
        },
        lastVisit: Date,
        usergroup: ObjectId,
    },
    { 
        timestamps: true 
    }
);

export default mongoose.model('User', User);
