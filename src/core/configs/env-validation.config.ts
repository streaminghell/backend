import { object, string, number, ValidationOptions } from '@hapi/joi';

export const validationSchema = object({
  NODE_ENV: string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: number().default(3000),
  SENTRY_DSN: string().required(),
  MONGODB_URI: string().required(),
  JWT_SECRET: string().required(),
  ODESLI_API_KEY: string().required(),
});

export const validationOptions: ValidationOptions = {
  allowUnknown: true,
  abortEarly: true,
};
