const userModel = require('../models/userModel');

exports.getUsers = async () => {
  return userModel.getUsers();
};

exports.getUserById = async (id) => {
  return userModel.getUserById(id);
};

exports.createUser = async (user) => {
  return userModel.createUser(user);
};

exports.login = async (email, password) => {
  return userModel.login(email,password);
};

exports.updateUser = async (id, user) => {
  return userModel.updateUser(id, user);
};

exports.deleteUser = async (id) => {
  return userModel.deleteUser(id);
};