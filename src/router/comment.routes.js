// deklare express
const express = require('express')
const { list, detail, insert, update, destroy } = require('../controller/comment.controller')

const router = express.Router()

// router
// .get('/', (req, res) => {
//     const data = [1,2,3,4]
//     res.json(data);
// })

router
  .get('/comment/list', list)
  .get('/comment/:iduser', detail)
  .post('/comment', insert)
  .put('/comment/:iduser', update)
  .delete('/comment/:iduser', destroy)

module.exports = router