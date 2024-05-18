const StatusCode = require("../helper/status_code_helper");
const DB = require("../helper/database_helper");

const productCreate = async (
  pic_1,
  pic_2,
  pic_3,
  pic_4,
  item,
  model,
  cpu,
  ram,
  storage,
  graphics,
  battery,
  screen_size,
  color,
  price
) => {
  try {
    const sql =
      "INSERT INTO products (pic_1, pic_2, pic_3, pic_4, item, model, cpu, ram, storage, graphics, battery, screen_size, color, price) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const result = await DB.query(sql, [
      pic_1,
      pic_2,
      pic_3,
      pic_4,
      item,
      model,
      cpu,
      ram,
      storage,
      graphics,
      battery,
      screen_size,
      color,
      price,
    ]);
    return new StatusCode.OK(result, "New products registration successful.");
  } catch (error) {
    return new StatusCode.UNKNOWN(error.message);
  }
};

const productList = async (page) => {
  try {
    const page_size = 10;
    const offset = (page - 1) * page_size;
    const sql = `SELECT * FROM products ORDER BY id DESC LIMIT ${page_size} OFFSET  ${offset}`;
    const list = await DB.query(sql, [page_size, offset]);
    // Query to count total number of bundles
    const countSql = "SELECT COUNT(*) AS total FROM products";
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

const productUpdate = async (
  pic_1,
  pic_2,
  pic_3,
  pic_4,
  item,
  model,
  cpu,
  ram,
  storage,
  graphics,
  battery,
  screen_size,
  color,
  price,
  id
) => {
  console.log({
    pic_1,
    pic_2,
    pic_3,
    pic_4,
    item,
    model,
    cpu,
    ram,
    storage,
    graphics,
    battery,
    screen_size,
    color,
    price,
    id,
  });
  try {
    const sql = `UPDATE products SET pic_1=?, pic_2=?, pic_3=?, pic_4=?, item=?, model=?, cpu=?, ram=?, storage=?, graphics=?, battery=?, screen_size=?, color=?, price=? WHERE id=?`;
    const result = await DB.query(sql, [
      pic_1,
      pic_2,
      pic_3,
      pic_4,
      item,
      model,
      cpu,
      ram,
      storage,
      graphics,
      battery,
      screen_size,
      color,
      price,
      id,
    ]);
    return new StatusCode.OK(result, "Products Data is updated");
  } catch (error) {
    console.log(error);
    return new StatusCode.UNKNOWN(error.message);
  }
};

const productDelete = async (id) => {
  try {
    const sql = `DELETE FROM products WHERE id=?`;
    await DB.query(sql, [id]);
    return new StatusCode.OK(null, `${id} id deleted.`);
  } catch (error) {
    return new StatusCode.UNKNOWN(error.message);
  }
};

const productItemSearch = async (item, page) => {
  try {
    const page_size = 10;
    const offset = (page - 1) * page_size;
    const sql = `SELECT * FROM products WHERE item=? ORDER BY id DESC LIMIT ${page_size} OFFSET  ${offset}`;
    const list = await DB.query(sql, [item, page_size, offset]);
    // Query to count total number of bundles
    const countSql = `SELECT COUNT(*) AS total FROM products WHERE item=?`;
    const countResult = await DB.query(countSql, [item]);
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

module.exports = {
  productCreate,
  productList,
  productUpdate,
  productDelete,
  productItemSearch,
};
