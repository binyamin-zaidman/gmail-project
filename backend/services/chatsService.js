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
  const userNameToChat = await pool.query(
    "select first_name || ' ' || last_name as chat_name  from users where phone = $1",
    [userToChat]
  );
  // console.log(userNameToChat.rows[0].chat_name);

  const resultInsertChat = await pool.query(
    "insert into chats (user_id,name) values ($1,$2) RETURNING *",
    [user_id, userNameToChat.rows[0].chat_name]
  );
  await pool.query(
    "insert into chat_users (chat_id,user_id) values ($1,$2) RETURNING *",
    [resultInsertChat.rows[0].id, user_id]
  );
  const recipientUserId = await getUserIdByName(userToChat);
  if (recipientUserId !== null) {
    await pool.query(
      "insert into chat_users (chat_id,user_id) values ($1,$2) RETURNING *",
      [resultInsertChat.rows[0].id, recipientUserId]
    );
    return resultInsertChat.rows[0];
  } else {
    return null;
  }
}

async function deleteChat(chatId) {
  try {
    const result = await pool.query(
      "UPDATE chats SET is_deleted = TRUE WHERE id = $1 RETURNING *",
      [chatId]
    );

    if (result.rowCount === 0) {
      return { success: false, message: "Chat not found or already archived." };
    }

    console.log("Chat archived:", result.rows[0]);
    return { success: true, chat: result.rows[0] };
  } catch (error) {
    console.error("Error archiving chat:", error);
    return { success: false, message: "Error archiving chat." };
  }
}

module.exports = { insertNewChat, deleteChat };
