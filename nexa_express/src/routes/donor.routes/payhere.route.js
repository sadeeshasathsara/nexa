import express from 'express';
import {
  handlePayHereNotification,
  handlePayHereReturn,
  getPaymentStatus,
  createPayHereSession
} from '../../controllers/donor.controllers/payhere.controller.js';

const router = express.Router();

// PayHere notification endpoint (receives payment status updates)
router.post('/notify', handlePayHereNotification);

// PayHere return endpoint (handles user return from PayHere)
router.get('/return', handlePayHereReturn);

// Get payment status
router.get('/status/:order_id', getPaymentStatus);

// Create PayHere payment session
router.post('/session', createPayHereSession);

export default router;
