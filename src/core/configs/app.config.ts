import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
}

export const app = registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.PORT) || 3000,
  }),
);
