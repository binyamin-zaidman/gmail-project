const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { insertNewChat } = require("./services/chatsService");
const { receiveMessages, insertMessege, insertMessage } = require("./services/messegeService");
const { pool } = require("./conectDB");
const cors = require("cors");
// const multer = require("multer"); ספרייה לעבודה עם קבצים

// ספרייה של soket.io
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { log } = require("console");
const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  }
});
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.on("sendMessage", async (data) => {
    console.log("Broadcasting message:", data);

    // await insertMessege(data.chat_id, data.message, false, 1);
    io.emit("newMessage", data);
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      io.emit("newMessage", data);
    });
  });
});

//middleware
app.use(express.json());

const generateToken = (userId, userPhone) => {
  const secretKey = crypto.randomBytes(64).toString("hex");
  return jwt.sign({ userId, userPhone }, secretKey, { expiresIn: "1h" });
};

app.post("/users/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const result = await pool.query(
      "SELECT id as user_id FROM users WHERE phone = $1 AND password = $2",
      [phone, password]
    );
    console.log(result.rows[0]);

    const token = generateToken(result.rows[0].id, result.rows[0].phone);
    res.json({ ...result.rows[0], token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/users/register", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, question, answer } =
      req.body;
    const result = await pool.query(
      "insert into users (first_name, last_name, email, password,phone, question, answer) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [firstName, lastName, email, password, phone, question, answer]
    );

    const token = generateToken(result.rows[0].id, result.rows[0].phone);

    res.json({ ...result.rows[0], token });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "create user error" });
  }
});

app.get("/chats/:userId", async (req, res) => {
  const user_id = req.params.userId;
  try {
    const result = await pool.query(
      "select * from chat_users join chats on chats.id = chat_users.chat_id where chat_users.user_id = $1",
      [user_id]
    );
    if (result.rows.length === 0) {
      return res.status(200).json({ message: "No chats found for this user." });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "error in get chats" });
  }
});

// app.post("/chats/:userId", async (req, res) => {
//   const user_id = req.params.userId;
//   const name = req.body.name;
//   const description = req.body.description;
//   // const token = req.headers.token;
//   console.log(req.body);

//   try {
//     const resultInsertChat = await pool.query(
//       "insert into chats (user_id,description,name) values ($1,$2,$3) RETURNING *",
//       [user_id, description, name]
//     );

//     const insertChatUser = await pool.query(
//       "insert into chat_users (chat_id,user_id) values ($1,$2) RETURNING *",
//       [resultInsertChat.rows[0].id, user_id]
//     );
//     res.json(resultInsertChat.rows, insertChatUser.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(404).json({ error: "error in create chat" });
//   }
// });

app.post("/chats/:userId", async (req, res) => {
  const user_id = req.params.userId;
  const userToChat = req.body.userToChat;
  const token = req.headers.token;

  const insertedChat = await insertNewChat(userToChat, user_id);

  res.json(insertedChat);
});

app.get("/:user_id/messege/:chat_id", async (req, res) => {
  const chat_id = req.params.chat_id;
  const user_id = req.params.user_id;

  const result = await receiveMessages(chat_id,user_id);
  console.log(result);

  res.json(result);
});

app.post("/message/:chat_id", async (req, res) => {
  const chat_id = req.params.chat_id;

  const { message, sender_id } = req.body;
  // const user_id = req.body.user_id;
  const token = req.headers.token;
  try {
    const result = await insertMessage(chat_id, message, sender_id);
    res.json(result);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost: "${port}"`);
});
