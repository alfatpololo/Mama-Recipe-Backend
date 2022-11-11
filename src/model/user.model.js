const db = require('../config/db')

const userModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router details
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router insert
  store: (username, phone, password) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO users (username, phone, password)
            VALUES
            ('${username}', '${phone}', '${password}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  //model register
  register: ({username, password, email, phone, level}) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            INSERT INTO users (username, password, email, phone, level)
            VALUES
            ('${username}', '${password}', '${email}', '${phone}', ${level})
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // model login
  checkUsername: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if(err) {
          reject(err)
        }
        resolve(res);
      })
    })
  },
  update: (id, username, password, email, phone, image) => {
    return new Promise ((resolve, reject) => {
      db.query(`UPDATE users SET
        username = COALESCE ($1, username),
        email = COALESCE ($2, email),
        password = COALESCE ($3, password),
        phone = COALESCE ($4, phone),
        image = COALESCE ($5, image)
        WHERE id = $6
        `,
        [username, email, password, phone, image, id]
      
            , (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
  destroy: (id) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            DELETE FROM users where id=${id}
            `, (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
}

module.exports = userModel