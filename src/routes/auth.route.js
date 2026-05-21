import express from 'express';
import passport from '../config/passport.config.js';
import * as authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { isAllowedRedirect } from '../utils/redirect.util.js';

const router = express.Router();

router.get("/google", (req, res, next) => {

    const success = req.query.success;
    const failure = req.query.failure;

    if (
        !isAllowedRedirect(success) ||
        !isAllowedRedirect(failure)
    ) {
        return res.status(400).json({
            error: "Redirect inválido"
        });
    }

    const state = JSON.stringify({
        success,
        failure
    });

    passport.authenticate("google", {
        scope: ["profile", "email"],
        state
    })(req, res, next);
});

router.get("/google/callback", (req, res, next) => {

    let state;

    try {

        if (!req.query.state) {
            throw new Error();
        }

        state = JSON.parse(req.query.state);
    } catch {
        return res.status(400).json({
            error: "State inválido"
        });
    }

    passport.authenticate("google", {
        failureRedirect: state.failure + "?error=email_nao_autorizado",
        session: true
    })(req, res, next)
},
    authController.googleCallback
);

router.get("/me", isAuthenticated, authController.me);

router.post('/logout', isAuthenticated, authController.logout);

export default router;