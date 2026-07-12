import jwt from "jsonwebtoken";

export function validarJWT(req, res, next) {

    const auth = req.headers.authorization;

    try {

        const token = auth.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "token inválido"
        });
    }
}