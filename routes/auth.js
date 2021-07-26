const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  updateDetails,
  updatePassword,
  nICNoValidation,
  chargingNotificationUrl,
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotPassword', forgotPassword);
router.post('/nICNoValidation', nICNoValidation);
router.post('/chargingNotificationUrl',chargingNotificationUrl);

module.exports = router;
