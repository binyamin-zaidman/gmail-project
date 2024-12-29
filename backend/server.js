const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { insertNewChat, deleteChat } = require("./services/chatsService");
const { receiveMessages, insertMessage } = require("./services/messegeService");
const { pool } = require("./conectDB");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
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
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
    socket.broadcast.emit("newMessage", data);
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

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Token is required" });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const userId = decoded.userId;
    try {
      const resultID = await pool.query("SELECT id FROM users WHERE id = $1", [
        userId
      ]);

      if (!resultID.rows.length || resultID.rows[0].id !== userId) {
        return res
          .status(403)
          .json({ error: "Unauthorized: User ID mismatch" });
      }
      req.user = userId;
      next();
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

const generateToken = (userId, userPhone) => {
  // const secretKey = crypto.randomBytes(64).toString("hex");
  return jwt.sign({ userId, userPhone }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
};

app.post("/users/login", async (req, res) => {
  const { phone, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT id as user_id, first_name || ' ' || last_name as user_name, email, phone, question, answer FROM users WHERE phone = $1 AND password =$2",
      [phone, password]
    );

    const token = generateToken(result.rows[0].user_id, result.rows[0].phone);
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
    const isUserXsist = await pool.query(
      "select phone, password from users where phone = $1 and password = $2",
      [phone, password]
    );
    if (!isUserXsist) {
      const result = await pool.query(
        "insert into users (first_name, last_name, email, password,phone, question, answer) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [firstName, lastName, email, password, phone, question, answer]
      );
      const token = generateToken(result.rows[0].id, result.rows[0].phone);

      res.json({ ...result.rows[0], token });
    } else {
      res.status(404).json({ error: "user is exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "create user error" });
  }
});

app.get("/users/:userId", async (req, res) => {
  const user_id = req.params.userId;
  try {
    const result = await pool.query("select * from users where id = $1", [
      user_id
    ]);
    res.json(result.rows[0]);
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/users/isLogged", verifyToken, async (req, res) => {
  res.json(req.user);
});

app.use(verifyToken);

app.get("/app/:user", async (req, res) => {
  const userId = req.params.user;
  console.log({ userId });

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const result = await pool.query(
      "select id, first_name || ' ' ||last_name as userName,email,phone from users where id= $1",
      [userId]
    );
    console.log(result.rows);

    if (result.rows) {
      res.json(result.rows);
    } else {
      res.send("user not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "error in get chats" });
  }
});

app.get("/chats/:userId", async (req, res) => {
  const user_id = req.params.userId;
  if (!user_id) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const result = await pool.query(
      "SELECT * FROM chat_users JOIN chats ON chats.id = chat_users.chat_id WHERE chats.is_deleted = false AND chat_users.user_id = $1",
      [user_id]
    );
    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "No chats found for this user." });
    }
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "error in get chats" });
  }
});

app.post("/users/getByPhone", async (req, res) => {
  const user = req.body.phone;
console.log("user from body", user);
  try {
    if (user.length == 10) {
      const queryByPHone = await pool.query(
        "select first_name || ' ' ||last_name as userName, phone from users where phone = $1",
        [user]
      );
      console.log("result by user phone",queryByPHone);

      res.json(queryByPHone.rows);
    } else {
      const queryByUserId = await pool.query(
        "select first_name || ' ' ||last_name as userName,phone from users where id = $1",
        [user]
      );
      console.log("result by user id",queryByUserId);
      
      res.json(queryByUserId.rows);
    }
  } catch {
    res.status("404").send(error, "user not exist by phone");
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
  const user_id = req.body.userId;
  const userToChat = req.body.userToChat;

  const insertedChat = await insertNewChat(userToChat, user_id);

  res.json(insertedChat);
});

app.delete("/chats/:chatId", async (req, res) => {
  const chatId = req.params.chatId;

  const result = await deleteChat(chatId);
  res.json(result);
});

app.get("/:user_id/messege/:chat_id", async (req, res) => {
  const chat_id = req.params.chat_id;
  const user_id = req.params.user_id;

  const result = await receiveMessages(chat_id, user_id);

  res.json(result);
});

app.post("/message/:chat_id", verifyToken, async (req, res) => {
  const chat_id = req.params.chat_id;

  const { message, sender_id } = req.body;
  // const user_id = req.body.user_id;
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
