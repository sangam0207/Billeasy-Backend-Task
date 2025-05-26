import express from "express";
import { ENV } from "./configs/constant.js";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middlewares/error.handler.js";
import { connectDB } from "./db/connection.js";
import authRouter from "./routes/auth.route.js";
import bookRouter from "./routes/book.route.js";
import reviewRouter from './routes/review.route.js'
import cookieParser from "cookie-parser";
global.revokedTokens = new Set();
global.generatedTokens = new Set();

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/v1/auth", authRouter);
app.use("/v1/book", bookRouter);
app.use("/v1/review",reviewRouter)

app.use(errorHandler);

app.listen(ENV.APP_PORT, () => {
  if (ENV.APP_ENV === "development") {
    console.log(`Listening to the port ${ENV.APP_PORT}`);
    connectDB();
  }
});
