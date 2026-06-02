import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/google", authController.googleAuth);

router.get("/google/callback", authController.googleCallback);

router.get("/me", isAuthenticated, authController.me);

router.post('/logout', isAuthenticated, authController.logout);

export default router;