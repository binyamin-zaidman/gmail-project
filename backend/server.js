const express = require("express");
const { Pool } = require("pg");
// const multer = require("multer"); ספרייה לעבודה עם קבצים

// ספרייה של soket.io
const http = require("http");
const { Server } = require("socket.io");
const { log } = require("console");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.json());

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // מאזינים להודעות מהלקוח
  socket.on("message", (data) => {
    console.log("Message received:", data);

    // משדרים הודעה לכל המשתמשים המחוברים
    io.emit("message", data);
    socket.broadcast.emit("message", data);
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

app.post("/users/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const result = await pool.query(
      "SELECT id as user_id FROM users WHERE phone = $1 AND password = $2",
      [phone, password]
    );
    log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users/register", async (req, res) => {
  try {
    const { first_name, last_name, Email, phone, password, question, answer } =
      req.body;
    const result = await pool.query(
      "insert into users (first_name, last_name, email, password,phone, question, answer) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [first_name, last_name, Email, password, phone, question, answer]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "create user error" });
  }
});

app.get("/chats/:userId", (req, res) => {
  const user_id = req.params.userId;
  try {
    const result = pool.query(
      "select * from chat_users join chats on chats.id = chat_users.chat_id where chat_users.user_id = $1",
      [user_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "error in get chats" });
  }
});

app.post("/chats", async (req, res) => {
  const user_id = req.params.userId;
  const name = req.body.name;
  const description = req.body.description;
  // const token = req.headers.token;
  try {
    const resultInsertChat = await pool.query(
      "insert into chats (user_id,description,name) values ($1,$2,$3) RETURNING *",
      [user_id, description, name]
    );
    const insertChatUser = await pool.query(
      "insert into chat_users (chat_id,user_id) values ($1,$2) RETURNING *",
      [resultInsertChat.rows[0].id,user_id]
    );
    res.json(resultInsertChat.rows, insertChatUser.rows);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "error in create chat" });
  }
});


// app.post("/chat/:userId", async (req, res) => {
//   const user_id = req.params.userId;
//   const name = req.body.name;
//   const description = req.body.description;
//   const token = req.headers.token;

//   const insertedChat = chatsService.insertNewChat(name, user_id, token, description);

//   res.json(resultInsertChat.rows, insertChatUser.rows);
// });


server.listen(port, () => {
  console.log(`Server is running on http://localhost: "${port}"`);
});
