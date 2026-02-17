export type Operation = "+" | "-" | "*" | "/";

export interface EvaluationRow {
  id: number;
  value1: number;
  value2: number;
  operation: Operation;
  answer: number;
  created_at: string;
}

export interface NewEvaluation {
  value1: number;
  value2: number;
  operation: Operation;
  answer: number;
}