const commentModel = require('../model/comment.model')

const commentController = {
  // metod
  list: (req, res) => {
    const limit = parseInt(req.query.limit) || 3;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
    commentModel
      .list(limit, offset)
      .then((results) => {
        res.json(results)
      }).catch((err) => {
        res.json(err)
      })
  },
  detail: (req, res) => {
    const id = req.params.iduser
    commentModel.selectDetail(iduser).then((results) => {
      res.json(results.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    const { iduser, idrecipe, idcomment, comment } = req.body
    commentModel.store( iduser, idrecipe, idcomment, comment ).then((results) => {
      res.json(results)
    }).catch((err) => {
      res.json(err)
    })
  },
  update: (req, res) => {
    const { iduser, idrecipe, idcomment, comment } = req.body
    commentModel.update( iduser, idrecipe, idcomment, comment ).then((results) => {
      res.jsson(results)
    }).catch((err) => {
      res.json(err)
    })
  },
  destroy: (req, res) => {
    const id = req.params.iduser
    commentModel.destroy(iduser).then((results) => {
      res.json(results.rows)
    }).catch((err) => {
      res.json(err)
    })
  }
}

module.exports = commentController
