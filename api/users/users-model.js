const db = require("../../data/dbConfig");

function findById(id) {
  return db("users").where("id", id);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findBy(filter) {
  return db("users as u").where(filter).select("username", "password");
}

module.exports = { findById, add, findBy };
