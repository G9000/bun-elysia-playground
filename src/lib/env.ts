export const env = Bun.env.NODE_ENV === "production" ? "PROD" : "DEV";
export const isDev = env === "DEV";
export const isProd = env === "PROD";

export const baseUrl = isDev
  ? "http://localhost:3000"
  : "http://localhost:3000"; // TODO:: Change later
