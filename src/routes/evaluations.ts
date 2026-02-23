import { Router } from "express";
import { pool } from "../db/pool.js";
import { newEvaluationSchema } from "../validators/evaluation.js";
import type { NewEvaluation, EvaluationRow } from "../types/evaluation.js";

export const evaluationsRouter = Router();

// POST /evaluations
evaluationsRouter.post("/", async (req, res) => {
  const parsed = newEvaluationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid body", details: parsed.error.flatten() });
  }

  const body: NewEvaluation = parsed.data;

  if (body.operation === "/" && body.value2 === 0) {
    return res.status(400).json({ error: "Division by zero is not allowed." });
  }

  await pool.execute(
    `INSERT INTO evaluations (value1, value2, operation, answer) VALUES (?, ?, ?, ?)`,
    [body.value1, body.value2, body.operation, body.answer]
  );

  return res.status(201).json({ ok: true });
});

// GET /evaluations
evaluationsRouter.get("/", async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT id, value1, value2, operation, answer, created_at
     FROM evaluations
     ORDER BY id DESC`
  );

  return res.json(rows as EvaluationRow[]);
});
