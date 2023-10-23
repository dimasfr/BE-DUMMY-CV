const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Employment = require('../../models/Employment');

// @route   GET api/employment/:id
// @desc    Get all employment
// @access  Punlic
router.get('/:id', async (req, res) => {
    try {
        const posts = await Employment.find({ profile: req.params.id });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/employment/:id
// @desc    Create a employment
// @access  Public
router.post('/:id', [[
    check('jobTitle', 'Job Title is required').not().isEmpty(),
    check('employer', 'Employer is required').not().isEmpty(),
    check('startDate', 'Start Date is required').not().isEmpty(),
    check('endDate', 'End Date is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newEmployment = new Employment({
            profile: req.params.id,
            jobTitle: req.body.jobTitle,
            employer: req.body.employer,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            city: req.body.city
        });

        const employment = await newEmployment.save();

        res.json(employment);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/employment/:id
// @desc    Delete a employment
// @access  Public
router.delete('/:id', async(req, res) => {
    try {
        const employment = await Employment.findOne({
            $and: [
                { profile: req.params.id },
                { _id: req.query.id }
            ]
        });

        if (!employment) {
            return res.status(401).json({ msg: 'Employment not found' });
        }

        await employment.deleteOne();

        res.json({ msg: 'Employment removed' });
    } catch (error) {
        console.error(error.message);

        if(error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Employment not found' });
        }

        res.status(500).send('Server Error');
    }
});

module.exports = router;