const fs = require("fs");
const userModel = require("../model/user.model");

const remove = async (req, res, next) => {
  const id = req.params.id;
  const data = await userModel.selectDetail(id);
  if (data.rows[0].image) {
    const photo = data.rows[0].image;
    fs.unlink(`./public_user/${photo}`, (err) => {
      if (err) {
        console.log(err);
        next();
      }
    });
    next();
  } else {
    res.json("Not found image");
  }
};

module.exports = remove;