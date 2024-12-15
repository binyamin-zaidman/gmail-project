const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
    //שאילתות לדאטה בייס
    user:"mywhatsapp1234",
    host: "localhost",
    database: "postgres",
    password: "mywhatsapp1234",
    port: 5432,
  });
  
module.exports = {pool};

