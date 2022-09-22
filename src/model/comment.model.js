const db = require('../config/db')

const commentModel = {
  // router list
  list: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comments LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router details
  selectDetail: (iduser) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comments WHERE id=${iduser}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router insert
  store: (iduser, idrecipe, idcomment, comment) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO comments (iduser, idrecipe, idcomment, comment)
            VALUES
            (${iduser}, '${idrecipe}', '${idcomment}', '${comment}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router edit/update
  update: (iduser, idrecipe, idcomment, comment) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            UPDATE users set comment = '${comment}' WHERE id = ${iduser}
            `, (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
  // router destroy/delete
  destroy: (iduser) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            DELETE FROM comments where id=${iduser}
            `, (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  }
}

module.exports = commentModel