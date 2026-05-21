import passport from "passport";
import { isAllowedRedirect } from '../utils/redirect.util.js';

export const googleCallback = (req, res) => {

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

    res.redirect(state.success);
};

export const logout = (req, res) => {

    const redirectUrl = req.body.redirectUrl;

    if (!isAllowedRedirect(redirectUrl)) {
        return res.status(400).json({
            error: "Redirect inválido"
        });
    }

    req.logout((err) => {
        if (err) return res.status(500).json(err);

        req.session.destroy((err) => {
            if (err) return res.status(500).json(err);

            res.clearCookie('connect.sid');

            return res.json({ redirectUrl });
        });
    });
};

export const me = (req, res) => {

    return res.json({
        autenticado: true,
        usuario: req.user
    });

};