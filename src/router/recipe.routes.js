// deklare express
const express = require('express')
const { list, detail, insert, update, destroy, detailTitle } = require('../controller/recipe.controller')

const router = express.Router()
const upload_recipe = require('../middleware/upload_recipe');
const deleteFile = require('../middleware/delete_recipe');
// router
// .get('/', (req, res) => {
//     const data = [1,2,3,4]
//     res.json(data);
// })

router
  .get('/recipe', list)
  .get('/recipe/:id', detail)
  .post('/recipe/:title', detailTitle)
  .post('/recipe/', upload_recipe, insert)
  .put('/recipe/update/:id', upload_recipe, deleteFile, update)
  .delete('/recipe/:id', deleteFile, destroy)

module.exports = router
