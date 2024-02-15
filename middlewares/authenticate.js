const jwt = require("jsonwebtoken");
const db = require("../models/db");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("Unauthorized1");
    }
    if (!authorization.startsWith("Bearer ")) {
      throw new Error("Unauthorized2");
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    const customers = await db.customers.findFirstOrThrow({
      where: { id: payload.id },
    });
    delete db.customers.password;
    console.log(customers);
    req.customers = customers;
    next();
  } catch (err) {
    next(err);
  }
};
