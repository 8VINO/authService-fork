import jwt from "jsonwebtoken";

export function gerarToken(usuario) {

    return jwt.sign(
        {
            googleId: usuario.googleId,
            email: usuario.email,
            nome: usuario.nome
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );

};