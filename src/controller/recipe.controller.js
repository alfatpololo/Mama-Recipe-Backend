const recipeModel = require('../model/recipe.model')
const {success, failed} = require('../helper/response')
const recipeController = {
  // metod
  list: (req, res) => {
    recipeModel.selectAll()
      .then((results) => {
        success(res, results, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    recipeModel.selectDetail(id).then((results) => {
      res.json(results.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    try {
      //image
      const image = req.file.filename
      //tangkap data dari body
      const {title, ingredients} = req.body;

          const data = {
              title,
              ingredients,
              image
          }

          recipeModel.insert(data).then((result) => {
              success(res, result, 'success', 'upload recipe success')

          }).catch((err) => {
              failed(res, err.message, 'failed', 'upload recipe failed')
          })
  } catch(err) {
      failed(res, err.message, 'failed', 'internal server error');
  }
  },
  update: (req, res) => {
    const { title, ingredients, description} = req.body
    const id = req.params.id
    const image = req.file.filename
    recipeModel.update(id, title, ingredients, description, image).then((results) => {
      success(res, results, 'success', 'update recipe success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'update recipe failed')
    })
  },
  destroy: (req, res) => {
    const id = req.params.id
    recipeModel.destroy(id).then((results) => {
      success(res, results, 'success', 'delete recipe success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'delete recipe failed')
    })
  },
  detailTitle: (req, res) => {
    const title = req.params.title
    recipeModel.detailTitle(title).then((results) => {
        res.json(results.rows)
      }).catch((err) => {
        res.json(err)
      })
  }
}

module.exports = recipeController