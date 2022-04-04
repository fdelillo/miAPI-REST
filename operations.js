const mysql = require('mysql');

function insertUser(pool, data, callback) {
    let queryInsert = "INSERT INTO user (name, mail) VALUES (?, ?);";
    let query = mysql.format(queryInsert, [data.name, data.mail]);

    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, function (err, result) {
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

function readAllUser(pool, callback) {
    let query = "SELECT * FROM user ;";
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, function (err, result) {
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });

}

function updateUser(pool, data, callback) {
    let queryUpdate = "UPDATE user SET name = ?, mail = ? WHERE id = ?;";
    let query = mysql.format(queryUpdate, [data.name, data.mail, data.id]);
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, function (err, result) {
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

function removeUser(pool, data, callback) {
    let queryDelete = "DELETE FROM user WHERE id = ?;";
    let query = mysql.format(queryDelete, [data.id]);
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, function (err, result) {
            if (err) throw err;
            callback(result);
            connection.release();
        });
    });
}

module.exports = { insertUser, readAllUser, updateUser, removeUser };