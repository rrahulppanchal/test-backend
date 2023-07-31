import db from "../db.js";

export const paginatedUserList = (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;

  const searchQuery = req.query.search;

  const filterQuery = req.query.filter;

  const orderQuery = req.query.order;

  const offset = (page - 1) * limit;

  let queryString = "SELECT * FROM data.test";

  if (searchQuery) {
    queryString += ` WHERE name LIKE '%${searchQuery}%'`;
  }

  if (filterQuery) {
    queryString += ` WHERE name='${filterQuery}'`;
  }

  if (orderQuery) {
    queryString += ` ORDER BY ${orderQuery}`;
  }

  queryString += ` LIMIT ${limit} OFFSET ${offset}`;

  db.query(queryString, (err, results) => {
    if (err) throw err;

    db.query("SELECT COUNT(*) AS count FROM data.test", (err, countResult) => {
      if (err) throw err;

      res.json({
        items: results,
        totalPages: Math.ceil(countResult[0].count / limit),
        currentPage: page,
        searchQuery: searchQuery,
        filterQuery: filterQuery,
        orderQuery: orderQuery,
      });
    });
  });
};

// const { id, limit1, search, searchField, page, limit, sortField, sortOrder } =
//   req.query;

// let q = `SELECT * FROM data.test`;

// if (id && limit1) {
//   q = `SELECT * FROM data.test where id > ${id} order by id limit ${limit1}`;
// }
// if (searchField && search) {
//   q += ` WHERE '%${searchField}' LIKE '%${search}%'`;
// }
// if (sortField && sortOrder) {
//   q = `SELECT * FROM data.test ORDER BY '${sortField} ${sortOrder.toUpperCase()}'`;
// } else if (page && limit) {
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   q += ` LIMIT ${startIndex},${endIndex}`;
// } else {
//   q = "SELECT * FROM data.test";
// }

// db.query(q, (err, result) => {
//   if (err) return res.json(err);
//   return res.json({ result });
// });
