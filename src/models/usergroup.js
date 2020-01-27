import mongoose, { mongo } from 'mongoose';

const Usergroup = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a group name'],
            index: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Usergroup', Usergroup);
