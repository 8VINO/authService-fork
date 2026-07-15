import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validarJWT } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.get("/google", authController.googleAuth);

router.get("/google/callback", authController.googleCallback);

router.get("/me", validarJWT, authController.me);

router.post('/logout', validarJWT, authController.logout);

export default router;