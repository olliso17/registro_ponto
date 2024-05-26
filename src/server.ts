import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./infra/routers/router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("olá mundo");
});
app.use('/api', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

