export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    db: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  cookieSecret: process.env.COOKIE_SECRET,
  cookieKeys: process.env.COOKIE_KEYS?.split(', '),
});
