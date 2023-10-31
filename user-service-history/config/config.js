import 'dotenv/config';
export const dbConfig = {
    HOST: process.env.POSTGRES_HOST,
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: process.env.POSTGRES_DB,
    PORT: process.env.POSTGRES_PORT,
    DIALECT: 'postgres',
};
