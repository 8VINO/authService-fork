import passport from "passport";
import { buscarClientPorId } from '../services/client.service.js';
import { randomUUID } from 'crypto';

export const googleAuth = async (req, res, next) => {

    try {

        const clientId = req.query.clientId;

        if (!clientId) return res.status(400).json({ error: "ClientId obrigatório" });

        const client = await buscarClientPorId(clientId);

        if (!client) return res.status(403).json({ error: "Cliente não autorizado" });

        const originHeader = req.headers.origin || req.headers.referer;

        if (!originHeader) return res.status(403).json({ error: "Cliente não autorizado" });

        const origin = new URL(originHeader).origin;
        const allowed = new URL(client.baseUrl).origin;

        if (origin !== allowed) return res.status(403).json({ error: "Cliente não autorizado" });

        const state = randomUUID();

        req.session.clientId = clientId;
        req.session.oauthState = state;

        passport.authenticate("google", {
            scope: ["profile", "email"],
            state
        })(req, res, next);

    } catch {
        return res.status(500).json({ error: "Erro interno" });
    }
};

export const googleCallback = (req, res, next) => {

    if (!req.session.oauthState || req.query.state !== req.session.oauthState) {
        return res.status(403).json({
            error: "State inválido"
        });
    }

    delete req.session.oauthState;

    passport.authenticate("google", { session: true }, async (err, user) => {

        try {

            const clientId = req.session.clientId;

            const client = await buscarClientPorId(clientId);

            if (!client) return res.status(403).json({ error: "Cliente não autorizado" });

            if (err || !user) {
                return res.redirect(`${client.baseUrl}/login?error=email_nao_autorizado`);
            }

            req.login(user, (err) => {

                if (err) return next(err)

                return res.redirect(`${client.baseUrl}/home`);

            });

        } catch {
            return res.status(500).json({ error: "Erro interno" });
        }

    })(req, res, next);
};

export const logout = async (req, res) => {

    try {

        const { clientId } = req.body;

        if (!clientId) return res.status(400).json({ error: "ClientId é obrigatório" });

        const client = await buscarClientPorId(clientId);

        if (!client) return res.status(403).json({ error: "Cliente não autorizado" });

        req.logout((err) => {
            if (err) return res.status(500).json({ error: "Erro ao encerrar sessão" });

            req.session.destroy((err) => {
                if (err) return res.status(500).json({ error: "Erro ao encerrar sessão" });

                res.clearCookie('connect.sid');

                return res.json({ redirectUrl: `${client.baseUrl}/login` });
            });
        });

    } catch {
        return res.status(500).json({ error: "Erro interno" });
    }

};

export const me = (req, res) => {

    return res.json({
        autenticado: true,
        usuario: req.user
    });

};