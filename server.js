require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 3500;

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const courseRouter = require("./routes/course");
const lecturerRouter = require("./routes/lecturer");
const optionsRouter = require("./routes/options");
const dashboardRouter = require("./routes/dashboard");

const app = express();

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/lecturer", lecturerRouter);
app.use("/api/v1/options", optionsRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Connect to MongoDB
connectDB();

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
