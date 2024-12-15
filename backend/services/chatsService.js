const {pool} = require("../conectDB");

async function insertNewChat(name,recipient_id, user_id, description) {
  const resultInsertChat = await pool.query(
    "insert into chats (user_id,description,name) values ($1,$2,$3) RETURNING *",
    [user_id, description, name]
  );
  const insertUserByChatUser = await pool.query(
    "insert into chat_users (chat_id,user_id) values ($1,$2) RETURNING *",
    [resultInsertChat.rows[0].id, user_id]
  );
  const insertRecipientByChatUser = await pool.query(
    "insert into chat_users (chat_id,user_id) values ($1,$2) RETURNING *",
    [resultInsertChat.rows[0].id, recipient_id]
  );
  return resultInsertChat.rows[0];
}
module.exports = { insertNewChat };
