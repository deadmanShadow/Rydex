import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressSession from "express-session";
import passport from "passport";
const app = express();
app.use(
  expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Server",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
