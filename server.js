import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from './src/config/passport.config.js';
import authRoutes from './src/routes/auth.route.js';

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = [
    process.env.FRONTEND_URL
];

app.use(cors({
    origin: (origin, callback) => {

        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin não permitida pelo CORS"));
    },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    },
));

// app.set("trust proxy", 1);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            secure: false

        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})