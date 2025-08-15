import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: false,
    },
    country: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema);
export default User;