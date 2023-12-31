import { NotFoundError } from "elysia";

export function handleErrors(error: unknown, message: string): void {
  if (error instanceof NotFoundError) {
    throw error;
  }
  console.error(message, error);
}

export type Result<T> = [T, null] | [null, Error];

// remove fn above and replace with this
export const betterTryCatch = async <T extends Promise<any> | (() => any)>(
  fn: T
): Promise<Result<Awaited<T extends () => any ? ReturnType<T> : T>>> => {
  try {
    let result;
    if (typeof fn !== "function") {
      result = await fn;
    } else {
      result = await fn();
    }
    return [result, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error];
    }

    if (typeof error === "string") {
      return [null, new Error(error)];
    }

    if (error && typeof error === "object" && "message" in error) {
      return [null, new Error(String(error.message), { cause: error })];
    }

    return [null, new Error("Unknown error")];
  }
};
