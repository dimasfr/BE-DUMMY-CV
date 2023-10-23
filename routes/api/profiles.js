const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');

// @route   GET api/profile/:id
// @desc    Get all profile
// @access  Punlic
router.get('/:id', async (req, res) => {
    try {
        const posts = await Profile.findOne({ _id: req.params.id });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create a profile
// @access  Public
router.post('/', [[
    check('wantedJobTitle', 'Wanted Job is required').not().isEmpty(),
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let checkProfile = await Profile.findOne({ email: req.body.email });

        if (checkProfile) {
            return res.status(500).send('Email is already Existed!');
        }

        const newProfile = new Profile({
            wantedJobTitle: req.body.wantedJobTitle,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            country: req.body.country,
            city: req.body.city,
            address: req.body.address,
            postalCode: req.body.postalCode,
            drivingLicense: req.body.drivingLicense,
            nationality: req.body.nationality,
            placeOfBirth: req.body.placeOfBirth,
            dateOfBirth: req.body.dateOfBirth,
            photoUrl: req.body.photoUrl
        });

        const profile = await newProfile.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/:id
// @desc    Update a profile
// @access  Public
router.put('/:id', [[
    check('wantedJobTitle', 'Wanted Job is required').not().isEmpty(),
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty()
]], async(req, res) => {
    try {
        let checkProfile = await Profile.findOne({ _id: req.params.id });

        if (checkProfile) {
            const updatedProfile = {
                wantedJobTitle: req.body.wantedJobTitle,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                country: req.body.country,
                city: req.body.city,
                address: req.body.address,
                postalCode: req.body.postalCode,
                drivingLicense: req.body.drivingLicense,
                nationality: req.body.nationality,
                placeOfBirth: req.body.placeOfBirth,
                dateOfBirth: req.body.dateOfBirth,
                photoUrl: req.body.photoUrl
            };

            const profile = await Profile.findOneAndUpdate(
                { _id: req.params.id }, 
                { $set: updatedProfile },
                { new: true }
            );

            return res.json(profile);
        }

        res.status(404).send('Profile not found');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;