import express from 'express';
import passport from '../config/passport.config.js';
import * as authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect: process.env.FRONTEND_LOGIN_URL,
        session: true 
    }),
    authController.googleCallback
);

router.get("/me", isAuthenticated, authController.me);

router.post('/logout', isAuthenticated, authController.logout);

export default router;