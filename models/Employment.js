const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmploymentSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    employer: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Employment = mongoose.model('Employment', EmploymentSchema);

module.exports = Employment;