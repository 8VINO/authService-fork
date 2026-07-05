import dotenv from 'dotenv';

dotenv.config();

const  dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD,
    NAME:process.env.DB_NAME || "postgres",
    PORT: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }

};

export default dbConfig;