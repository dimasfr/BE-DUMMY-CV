const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    wantedJobTitle: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    postalCode: {
        type: Number
    },
    drivingLicense: {
        type: String
    },
    nationality: {
        type: String
    },
    placeOfBirth: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    photoUrl: {
        type: String
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;