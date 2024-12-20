const { pool } = require("../conectDB");

async function getUserIdByName(name) {
  const result = await pool.query("SELECT id FROM users WHERE phone = $1", [
    name
  ]);
  if (result.rows.length > 0) {
    return result.rows[0].id;
  } else {
    // const insertResult = await pool.query(
    //   "INSERT INTO users (first_name,phone) VALUES ($1,$2) RETURNING id",
    //   [name, name]
    // );
    return null;
  }
}

async function insertNewChat(userToChat, user_id) {
  const resultInsertChat = await pool.query(
    "insert into chats (user_id,name) values ($1,$2) RETURNING *",
    [user_id, userToChat]
  );
  await pool.query(
    "insert into chat_users (chat_id,user_id) values ($1,$2) RETURNING *",
    [resultInsertChat.rows[0].id, user_id]
  );
  const recipientUserId = await getUserIdByName(userToChat);
  if(recipientUserId !== null) {
  await pool.query(
    "insert into chat_users (chat_id,user_id) values ($1,$2) RETURNING *",
    [resultInsertChat.rows[0].id, recipientUserId]
  );
  return resultInsertChat.rows[0];
}else {
  return null;
}
}
module.exports = { insertNewChat };
