import dotenv from "dotenv";
dotenv.config();

const ENV = {
  APP_ENV: process.env.APP_ENV,
  APP_PORT: process.env.APP_PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_KEY:process.env.SECRET_KEY,
  TWILIO_ACCOUNT_SID:process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN:process.env.TWILIO_AUTH_TOKEN,
  TWILIO_VERIFY_SERVICE_SID:process.env.TWILIO_VERIFY_SERVICE_SID,
  ELEVEN_LAB_API_KEY:process.env.ELEVEN_LAB_API_KEY
};

export { ENV };