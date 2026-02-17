import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { evaluationsRouter } from "./routes/evaluations.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/evaluations", evaluationsRouter);

const port = Number(process.env.PORT ?? "3000");
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});