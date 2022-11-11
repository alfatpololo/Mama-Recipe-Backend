const db = require('../config/db')

const recipeModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipes ORDER BY title ASC', (err, res) => {
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
      db.query(`SELECT * FROM recipes WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router insert
  insert: ({title, ingredients, image}) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO recipes (title, ingredients, image)
            VALUES
            ('${title}', '${ingredients}', '${image}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router edit/update
  update: (id, title, ingredients, description, image) => {
    return new Promise ((resolve, reject) => {
      db.query(`UPDATE recipes SET
        title = COALESCE ($1, title),
        ingredients = COALESCE ($2, ingredients),
        description = COALESCE ($3, description),
        image = COALESCE ($4, image)
        WHERE id = $5
        `,
        [title, ingredients, description, image, id]
      
            , (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
},
  // router destroy/delete
  destroy: (id) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            DELETE FROM recipes where id=${id}
            `, (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
  //lihat data by title
  detailTitle: (title) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from recipes where title ilike '%${title}%'`, (err, res) => {
            if(err){
                reject(err);
            }
            resolve(res);
        })
    })
  },
}

module.exports = recipeModel