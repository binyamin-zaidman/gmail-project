const express = require("express");
const { Pool } = require("pg");
const multer = require("multer");
const app = express();
const port = 3000;

const pool = new Pool({
  user: "mywhatsapp1234",
  host: "localhost",
  database: "postgres",
  password: "mywhatsapp1234",
  port: 5432
});

const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectMongoDB() {
  await client.connect();
  const db = client.db("chat_database");
  console.log("Connected to MongoDB");
  return db;
}
