const pool = require("../../config/database");

module.exports = {
    createUser: (data, callback) => {
        pool.query(
            `insert into registration(id, firstname, lastname, gender, email, password, number)
                        values(?,?,?,?,?,?,?)`,
            [
                data.id,
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.number,
            ],
            (error, results, fields) => {
                if (error) {
                  return callback(error);
                }
                return callback(null ,results);
            }            
        );
    },  

    getUsers: callback => {
        pool.query(
            `select id,firstname,lastname,gender,email,number from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getUserById: (id, callback) => {
        pool.query(
            `select id,firstname,lastname,gender,email,number from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    updateUser: (data, callback) => {
        pool.query(
            `update registration set firstname=?,lastname=?,gender=?,email=?,password=?,number=? where id = ?`,
            [
                data.firstname,
                data.lastname,
                data.gender,
                data.email,
                data.password,
                data.number,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    deleteUser: (id, data, callback) => {
        pool.query(
            `delete from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }, 

    getUserByEmail: (email, callback) => {
        pool.query(
            `select * from registration where email =?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callback(error);
                }
                return callback(null,results[0]);
            }
        );
    },
};