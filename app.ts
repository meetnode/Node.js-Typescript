//Import package or modules
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./src/routes";
import usersRouter from "./src/routes/users";

import http from "http";

//Define interface or type
interface ListenError extends Error {
  syscall?: string;
  code: string;
}

// App configure
let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Server listen
let port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

let server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is running on: http://localhost:${port}`);
});
server.on("error", onError);

//Define routers
app.use("/", indexRouter);
app.use("/users", usersRouter);


//Error listener
function onError(error: ListenError) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// NormalizePort
function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

export default app;
