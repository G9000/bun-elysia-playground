import { NotFoundError, t } from "elysia";

export function handleErrors(error: unknown, message: string): void {
  if (error instanceof NotFoundError) {
    throw error;
  }
  console.error(message, error);
}
