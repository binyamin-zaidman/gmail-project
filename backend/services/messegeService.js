const { json } = require("express");
const { pool } = require("../conectDB");

async function receiveMessages(chat_id, user_id) {
  const result = await pool.query(
    `
      SELECT 
    messages.id AS message_id,
    messages.chat_id,
    messages.message,
    messages.timestamp AS message_time,
    messages.read AS is_read,
    users.first_name || ' ' || users.last_name AS sender_name,
    chats.name AS chat_name,
    messages.sender AS sender_id
FROM 
    messages
JOIN 
    chats ON messages.chat_id = chats.id 
JOIN 
    users ON messages.sender = users.id 
JOIN 
    chat_users ON messages.chat_id = chat_users.chat_id
WHERE 
     messages.chat_id = $1 
     AND chat_users.user_id = $2
ORDER BY 
    messages.timestamp ASC; 

      `,
    [chat_id, user_id]
  );
  return result.rows;
}

async function insertMessage(chat_id, message, sender_id) {
  const result = await pool.query(
      `
      INSERT INTO messages (chat_id, message, sender) 
            VALUES ($1, $2, $3) 
            RETURNING id, chat_id, message, sender, timestamp AS message_time, read AS is_read
      `,
      [chat_id, message, sender_id]
  );

  const savedMessage  = result.rows[0];

  const senderResult = await pool.query(
    `SELECT first_name || ' ' || last_name AS sender_name FROM users WHERE id = $1`,
    [sender_id]
);
const sender_name = senderResult.rows[0]?.sender_name || "Unknown";

return { ...savedMessage, sender_name };
}


module.exports = { receiveMessages, insertMessage };
