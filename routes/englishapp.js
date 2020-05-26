const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all user' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `get user ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Update user ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Delete ${req.params.id}` });
});

module.exports = router;
