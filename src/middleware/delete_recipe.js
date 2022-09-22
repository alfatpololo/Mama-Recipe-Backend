const fs = require("fs");
const recipeModel = require("../model/recipe.model");

const remove = async (req, res, next) => {
  const id = req.params.id;
  const data = await recipeModel.selectDetail(id);
  if (data.rows[0].image) {
    const photo = data.rows[0].image;
    fs.unlink(`./public_recipe/${photo}`, (err) => {
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