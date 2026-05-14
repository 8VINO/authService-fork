import passport from "passport";

export const googleCallback = (req, res) => {
    res.redirect(process.env.FRONTEND_SUCCESS_URL);
};

export const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json(err);

        req.session.destroy((err) => {
            if (err) return res.status(500).json(err);

            res.clearCookie('connect.sid');

            return res.json({ message: "Logout realizado com sucesso." });
        });
    });
};

export const me = (req, res) => {

    return res.json({
        autenticado: true,
        usuario: req.user
    });

};