const database = require('../configs/database');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool(database);

exports.getUsers = async () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

exports.getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

exports.login = async (email, password) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
      if (error) {
        return reject(error);
}
      if (results.length === 0) {
        return reject(new Error('Invalid email or password'));
      }
      const user = results[0];
      // Compare the provided password with the stored hash
      bcrypt.compare(password, user.password, (err, isPasswordValid) => {
        if (err) {
          return reject(err);
        }
        if (!isPasswordValid) {
          return reject(new Error('Invalid email or password'));
        }
        return resolve(user);
      });
    });
  });
};

exports.createUser = async (user) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users SET ?', user, (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results.insertId);
    });
  });
};

exports.updateUser = async (id, user) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE users SET ? WHERE id = ?', [user, id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results.affectedRows);
    });
  });
};

exports.deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = ?', [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results.affectedRows);
    });
  });
};