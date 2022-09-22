const userModel = require('../model/user.model');
const {success, failed, succesWithToken} = require('../helper/response')

//declare bcrypt

const bcrypt = require('bcrypt');
const jwtToken = require('../helper/generateJWT');

module.exports = {
    register: (req, res) => {
        try {
        //image
        const image = req.file.filename
        //tangkap data dari body
        const {username, password, email, phone, level} = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
            if(err){
                failed(res, err.message, 'failed', 'failed hash password');
            }

            const data = {
                username,
                password: hash,
                email,
                phone,
                image,
                level
            }

            userModel.register(data).then((result) => {
                success(res, result, 'success', 'register success')

            }).catch((err) => {
                failed(res, err.message, 'failed', 'register failed')
            })
        })
    } catch {
        failed(res, err.message, 'failed', 'internal server error');
    }
    },

    login: async (req, res) => {
        const {username, password} = req.body;
        userModel.checkUsername(username).then((result) => {
            // console.log(res.rows[0]);
            const user = result.rows[0];
            if(result.rowCount > 0) {
                bcrypt.compare(password, result.rows[0].password).then(async (result) => {
                    if(result) {
                        const token = await jwtToken({
                            username: user.username,
                            level: user.level
                        })
                        console.log(token);
                        succesWithToken(res, token, "success", "login success");
                    } else {
                        // ketika password salah
                        failed(res, null, 'failed', 'username or password is wrong');
                    }
                })
            } else {
                //ketika username salah
                failed(res, null, 'failed', 'username or password is wrong');
            }
        }).catch((err) => {
            failed(res, err, 'failed', 'internal server error');
        })
    }
}