type EnvironmentType = "development" | "production";

export const ENVIRONMENT: EnvironmentType = (
  process.env.NODE_ENV as string
).trim() as EnvironmentType;

export const PROJECT_ID: string = (process.env.PROJECT_ID as string).trim();
