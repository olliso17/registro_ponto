import cors from 'cors';
import dotenv from "dotenv";
import express, { Express } from "express";
import router from "./infra/routers/router";

dotenv.config();

export const app: Express = express();
export const port = process.env.PORT || 3000;

app.use(express.json());



app.use(express.urlencoded({ extended: true }));

const corsOptions: cors.CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/api', router);