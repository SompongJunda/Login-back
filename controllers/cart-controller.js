const db = require("../models/db");
const { Status } = require("@prisma/client");

exports.getByCart = async (req, res, next) => {
  try {
    const carts = await db.cart.findMany({
      where: { customersId: req.customers.id },
    });
    res.json({ carts });
  } catch (err) {
    next(err);
  }
};

exports.createCart = async (req, res, next) => {
  // validate req.body
  const data = req.body;
  try {
    const rs = await db.customers.create({
      data: { ...data, customersId: req.customers.id },
    });
    res.json({ msg: "Create OK", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  // validate req.params + req.body
  const { id } = req.params;
  const data = req.body;
  try {
    const rs = await db.cart.update({
      data: { ...data },
      where: { id: +id, customersId: req.customers.id },
    });
    res.json({ msg: "Update ok", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rs = await db.cart.delete({
      where: { id: +id, customersId: req.customers.id },
    });
    res.json({ msg: "Delete ok", result: rs });
  } catch (err) {
    next(err);
  }
};
