import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },

    addressLine1: {
        type: String,
        required: false,
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