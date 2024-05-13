const StatusCode = require("../helper/status_code_helper");
const DB = require("../helper/database_helper");
const { trace } = require("../endpoints/advertising_endpoint");

const advCreate = async (pic_1, pic_2, pic_3, pic_4, text) => {
  try {
    const sql =
      "INSERT INTO advertising (pic_1, pic_2, pic_3, pic_4, text) VALUES(?,?,?,?,?)";
    const result = await DB.query(sql, [pic_1, pic_2, pic_3, pic_4, text]);
    return new StatusCode.OK(result, "New Advertise registration successful.");
  } catch (error) {
    return new StatusCode.UNKNOWN(error.message);
  }
};

const advList = async (page) => {
  try {
    const page_size = 10;
    const offset = (page - 1) * page_size;
    const sql = `SELECT * FROM advertising ORDER BY id DESC LIMIT ${page_size} OFFSET  ${offset}`;
    const list = await DB.query(sql, [page_size, offset]);
    // Query to count total number of bundles
    const countSql = "SELECT COUNT(*) AS total FROM advertising";
    const countResult = await DB.query(countSql);
    const total = countResult[0].total;
    if (list.length > 0) {
      return new StatusCode.OK({ list, total });
    } else {
      return new StatusCode.NOT_FOUND(null);
    }
  } catch (error) {
    return new StatusCode.UNKNOWN(error.message);
  }
};

const advUpdate = async (pic_1, pic_2, pic_3, pic_4, text, id) => {
  try {
    const sql = `UPDATE advertising SET pic_1=?, pic_2=?, pic_3=?, pic_4=?, text=? WHERE id=?`;
    const result = await DB.query(sql, [pic_1, pic_2, pic_3, pic_4, text, id]);
    return new StatusCode.OK(result, "Advertising Data is updated");
  } catch (error) {
    return new StatusCode.UNKNOWN(error.message);
  }
};

const advDelete = async (id) => {
  try {
    const sql = ` DELETE FROM advertising WHERE id=?`;
    const result = await DB.query(sql, [id]);
    return new StatusCode.OK(`Advertising ${id} is deleted!`);
  } catch (error) {
    return new StatusCode.UNKNOWN(error.message);
  }
};

module.exports = { advCreate, advList, advUpdate, advDelete };
