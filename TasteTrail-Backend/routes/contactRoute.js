import express from 'express';
import { sendEmail } from '../controllers/contactController.js';

const contactRouter = express.Router();

contactRouter.post('/sendEmail', sendEmail);

export default contactRouter