const { Pool } = require("pg");
const format = require("pg-format");

require("dotenv").config();
console.log(process.env);
const pool = new Pool({
  user: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  port: process.env.db_port,
  database: process.env.database,
});

process.on("SIGINT", async () => {
  await pool.end();
  console.log("Pool has been closed");
  process.exit(0);
});

async function insertEntry(modelInstance) {
  const table = modelInstance.constructor.table;
  const data = modelInstance.toDBEntry();
  const keys = Object.keys(data);
  const values = Object.values(data);

  const query = format("INSERT INTO %I (%I) VALUES (%L)", table, keys, values);

  await pool.query(query);
}

async function findOne(table, filters) {
  if (!filters || Object.keys(filters).length === 0) {
    throw new Error("Filters object must have at least one key");
  }

  const keys = Object.keys(filters);
  const values = Object.values(filters);

  const whereClause = keys
    .map((key, i) => format("%I = %L", key, values[i]))
    .join(" AND ");

  const query = format("SELECT * FROM %I WHERE %s LIMIT 1", table, whereClause);

  const result = await pool.query(query);
  return result.rows;
}

async function findId(table, filters) {
  if (!filters || Object.keys(filters).length === 0) {
    throw new Error("Filters object must have at least one key");
  }

  const keys = Object.keys(filters);
  const values = Object.values(filters);

  const whereClause = keys
    .map((key, i) => format("%I = %L", key, values[i]))
    .join(" AND ");

  const query = format("SELECT id FROM %I WHERE %s ", table, whereClause);

  const result = await pool.query(query);
  return result.rows;
}

async function findAll(table, filters) {
  if (!filters || Object.keys(filters).length === 0) {
    throw new Error("Filters object must have at least one key");
  }

  const keys = Object.keys(filters);
  const values = Object.values(filters);

  const whereClause = keys
    .map((key, i) => format("%I = %L", key, values[i]))
    .join(" AND ");

  const query = format("SELECT * FROM %I WHERE %s", table, whereClause);
  const result = await pool.query(query);
  return result.rows;
}

/**
 *
 * Takes in table name and ID of row.
 * ID is the only filter allowed for deletion, get ID from findId()
 *
 * @param {String} table
 * @param {String} id
 * @returns
 */
async function deleteEntry(table, id) {
  const query = format("DELETE FROM %I WHERE id = %L", table, id);

  const result = await pool.query(query);
  return result.rows;
}

async function updateEntry(table, id, updates) {
  if (!id) throw new Error("Missing ID for update");
  if (!updates || Object.keys(updates).length === 0)
    throw new Error("No fields to update");

  const keys = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = keys
    .map((key, i) => format("%I = %L", key, values[i]))
    .join(", ");

  const query = format("UPDATE %I SET %s WHERE id = %L", table, setClause, id);

  const result = await pool.query(query);
  return result;
}

module.exports = {
  insertEntry,
  findOne,
  findAll,
  deleteEntry,
  findId,
  updateEntry,
};
