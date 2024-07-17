import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

app.get('/api', (req, res) => {
    res.send('Welcome to API');
})