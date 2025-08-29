const express = require('express');
const Joi = require('joi');
const Feedback = require('../models/Feedback');

const router = express.Router();

const feedbackSchema = Joi.object({
  title: Joi.string().required().max(200).trim(),
  description: Joi.string().required().max(1000).trim(),
  category: Joi.string().valid('Bug', 'Feature', 'Improvement').required()
});

router.get('/', async (req, res) => {
  try {
    const { sort, category, q } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (q) {
      query.title = { $regex: q, $options: 'i' };
    }

    let sortOption = {};
    if (sort === 'oldest') {
      sortOption.createdAt = 1;
    } else {
      sortOption.createdAt = -1; 
    }

    const feedback = await Feedback.find(query).sort(sortOption);
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const { error, value } = feedbackSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const feedback = new Feedback(value);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/vote', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
