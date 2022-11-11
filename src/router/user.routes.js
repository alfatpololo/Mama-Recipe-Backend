// deklare express
const express = require('express')
const { list, detail, insert, update, destroy, } = require('../controller/user.controller')
const {register, login} = require('../controller/auth.controller')
const router = express.Router()

const jwtAuth = require('../middleware/jwtAuth');
const {isAdmin, isCustomer} = require('../middleware/authorization');
const upload_user = require('../middleware/upload_user');
const deleteFile = require('../middleware/delete_user');
// router
// .get('/', (req, res) => {
//     const data = [1,2,3,4]
//     res.json(data);
// })

router
  .get('/user/list', jwtAuth, isAdmin, list)
  .get('/user/:id', detail)
  .post('/user', insert)
  .put('/user/update/:id',upload_user, deleteFile, update)
  .delete('/user/:id', deleteFile, destroy)

  //register
  .post('/register', register)
  //login
  .post('/login', login)

module.exports = router
