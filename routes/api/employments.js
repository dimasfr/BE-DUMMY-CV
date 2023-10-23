const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Employment = require('../../models/Employment');

// @route   GET api/employment/:id
// @desc    Get all employment
// @access  Punlic
router.get('/:id', async (req, res) => {
    try {
        const posts = await Employment.findOne({ _id: req.params.id });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/employment
// @desc    Create a employment
// @access  Public
router.post('/', [[
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

// @route   PUT api/employment/:id
// @desc    Update a employment
// @access  Public
router.put('/:id', [[
    check('jobTitle', 'Job Title is required').not().isEmpty(),
    check('employer', 'Employer is required').not().isEmpty(),
    check('startDate', 'Start Date is required').not().isEmpty(),
    check('endDate', 'End Date is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty()
]], async(req, res) => {
    try {
        let checkEmployment = await Employment.findOne({ _id: req.params.id });

        if (checkEmployment) {
            const updatedEmployment = {
                jobTitle: req.body.jobTitle,
                employer: req.body.employer,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                city: req.body.city
            };

            const employment = await Employment.findOneAndUpdate(
                { _id: req.params.id }, 
                { $set: updatedEmployment },
                { new: true }
            );

            return res.json(employment);
        }

        res.status(404).send('Employment not found');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;