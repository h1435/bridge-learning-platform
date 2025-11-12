export const AppConfig = () => ({
  app: {
    name: process.env.APP_NAME ?? 'learning-platform-backend',
    env: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 3000),
    apiPrefix: process.env.API_PREFIX ?? '/api/v1'
  }
});

