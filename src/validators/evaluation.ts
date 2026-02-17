import { z } from "zod";

export const operationSchema = z.union([
  z.literal("+"),
  z.literal("-"),
  z.literal("*"),
  z.literal("/"),
]);

export const newEvaluationSchema = z.object({
  value1: z.number(),
  value2: z.number(),
  operation: operationSchema,
  answer: z.number(),
});