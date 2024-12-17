const { json } = require("express");
const { pool } = require("../conectDB");

async function receiveMessages(chat_id) {
  const result = await pool.query(`SELECT messages.*,chats.name AS chat_name
    FROM 
      messages
    JOIN 
      chats 
    ON 
      messages.chat_id = chats.id
    WHERE 
      messages.chat_id = $1
  `,
    [chat_id]
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
