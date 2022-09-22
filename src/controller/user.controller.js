const userModel = require('../model/user.model')
const { success, failed } = require('../helper/response');

const userController = {
  // metod
  list: (req, res) => {
    userModel.selectAll()
      .then((results) => {
        success(res, results, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    userModel.selectDetail(id).then((results) => {
      res.json(results.fields[0])
    }).catch((err) => {
      res.json(err)
    })
  },
  insert: (req, res) => {
    const { username, phone, password } = req.body
    userModel.store( username, phone, password).then((results) => {
      success(res, results, 'success', 'insert user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'get all user failed')
    })
  },
  update: (req, res) => {
    const {username, password, email, phone} = req.body
    const id = req.params.id
    const image = req.file.filename
    userModel.update(id, username, password, email, phone, image).then((results) => {
      success(res, results, 'success', 'update user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'update user failed')
    })
  },
  destroy: (req, res) => {
    const id = req.params.id
    userModel.destroy(id).then((results) => {
      success(res, results, 'success', 'delete user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'get all user failed')
    })
  }
}

module.exports = userController
