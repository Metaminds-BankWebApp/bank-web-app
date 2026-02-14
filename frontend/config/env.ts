const DEFAULT_API_BASE_URL = "http://localhost:8080/api";

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL,
} as const;

export type AppEnv = typeof env;
