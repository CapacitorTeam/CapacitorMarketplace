const postgresDao = require("../Daos/postgresDao");

async function getSingleRowByFilters(table, filters) {
  const result = await postgresDao.findOne(table, filters);

  return result.length > 0 ? result[0] : null;
}

async function getRowsByFilters(table, filters) {
  return await postgresDao.findAll(table, filters);
}

async function deleteRowById(table, id) {
  return await postgresDao.deleteEntry(table, id);
}

async function updateRowById(table, id, updates) {
  return await postgresDao.updateEntry(table, id, updates);
}

module.exports = {
  getSingleRowByFilters,
  getRowsByFilters,
  deleteRowById,
  updateRowById,
};
