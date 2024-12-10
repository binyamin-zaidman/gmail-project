const express = require("express");
const { Pool } = require("pg");
// const multer = require("multer"); ספרייה לעבודה עם קבצים

// ספרייה של soket.io
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // מאזינים להודעות מהלקוח
  socket.on("message", (data) => {
    console.log("Message received:", data);

    // משדרים הודעה לכל המשתמשים המחוברים
    io.emit("message", data);
  });

  // טיפול בניתוק
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const pool = new Pool({
  //שאילתות לדאטה בייס
  user: "mywhatsapp1234",
  host: "localhost",
  database: "postgres",
  password: "mywhatsapp1234",
  port: 5432
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
