// Basic app setup
var express = require("express");
const path = require('path');
const cors = require("cors");
const db = require("./database");
const router = require("./routes");
const logger = require("./config/logger");
const dotenv = require("dotenv");
const morgan = require('morgan');

const AppError = require("./utils/app.error");
const globalErrorHandler = require("./controller/error.controller");
const cookieParser = require('cookie-parser');

var app = express();
db();
dotenv.config();
dotenv.config({path: './secret.env'});

// ALLOW OTHER WEBSITE TO ACCESS OUT API
app.use(cors()); // work for get, post
app.options("*", cors()); // work for patch, delete, cookie,...

// log request info
if (process.env.NODE_ENV == 'development'){
	app.use(morgan('dev'));
}

// parse body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parser cookies
app.use(cookieParser());

// Set up the view engine
app.set("view engine", "pug");
app.set('views', path.jo)

// Set up the routes
app.use("/api", router);

// HANDLE ERROR: For Routes not defined
app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can not find ${req.originalUrl} on this server!`, 404)
  );
});

// ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandler);

// Start the server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Our app is running on http://localhost:" + port);
});

// uncaught exception error
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");

  process.exit(1);
});

// handler unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");

  // finish all request pending or being handled before close server
  server.close(() => {
    process.exit(1);
  });
});

// when mongoose is restarted
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully...");

  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
