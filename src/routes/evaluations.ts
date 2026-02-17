import { Router, Request, Response } from "express";
import { pool } from "../db/pool.js";
import { newEvaluationSchema } from "../validators/evaluation.js";
import type { NewEvaluation, EvaluationRow } from "../types/evaluation.js";

export const evaluationsRouter = Router();

evaluationsRouter.post("/", async (req: Request, res: Response) => {
  const parsed = newEvaluationSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const body: NewEvaluation = parsed.data;

  if (body.operation === "/" && body.value2 === 0) {
    return res.status(400).json({ error: "Cannot divide by zero." });
  }

  await pool.execute(
    "INSERT INTO evaluations (value1, value2, operation, answer) VALUES (?, ?, ?, ?)",
    [body.value1, body.value2, body.operation, body.answer],
  );

  res.status(201).json({ ok: true });
});

evaluationsRouter.get("/", async (_req: Request, res: Response) => {
  const [rows] = await pool.query("SELECT * FROM evaluations ORDER BY id DESC");
  res.json(rows as EvaluationRow[]);
});
