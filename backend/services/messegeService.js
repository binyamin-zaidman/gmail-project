const { json } = require("express");
const { pool } = require("../conectDB");

async function receiveMessages(user_id, chat_id) {
  const result = await pool.query(
    `
    SELECT *
    FROM messages
    JOIN chat_users ON messages.chat_id = chat_users.chat_id
    WHERE messages.chat_id = $1 AND chat_users.user_id = $2
  `,
    [chat_id, user_id]
  );
  return result.rows;
}

async function insertMessege(chat_id, message, read = false, sender_id) {
  const result = await pool.query(
    "insert into messages (chat_id,message,read,sender) values ($1,$2,$3,$4) RETURNING *",
    [chat_id, message.text, read, sender_id]
  );

  return result.rows;
}

module.exports = { receiveMessages, insertMessege };
