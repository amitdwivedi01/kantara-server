const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const http = require("http"); // Import http module
const socketIo = require("socket.io"); // Import socket.io
const routesList = require("express-list-routes");
const userRouter = require("./routes/user-router");
require("dotenv").config();

const app = express();
const server = http.createServer(app); // Create HTTP server

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
  req.date = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.status(201).json({
    status: "success",
    data: {
      message: "server running perfectly",
    },
  });
});

app.use("/api/v1/users", userRouter);

routesList(app);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASEURL, { dbName: "portfolio-backend" })
  .then(() => {
    console.log("connected to server!");
  });

const io = socketIo(server, {
  cors: {
    origin: "*", // Set origin to allow all origins
    methods: ["GET", "POST"], // Set allowed HTTP methods
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  
  socket.on("send_message" , (data)=> {
    console.log('message received' , data); 
    io.emit("receive_message" , data)
  })

  socket.on("save_ans" , (data) => {
    io.emit("receive_ans" , data)
  })

  socket.on("onpage" , (data)=> {
    io.emit("onpagechanged" , data)
  })


  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down.........");
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});