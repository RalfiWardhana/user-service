const userService = require('../services/userService');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json({ message: 'Get users successfully', status:200, users :users });
  } catch (error) {
    res.status(500).json({ message: error.message, status:500 });
  }
};

exports.createUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role').notEmpty().withMessage('Invalid role'),
  body('phone').notEmpty().withMessage('Invalid phone number'),
  body('photo').optional(),
  body('position').notEmpty().withMessage('Position is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid request body', status:400, errors: errors.array() });
    }

    try {
      const user = req.body;
      // Encrypt the password
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      await userService.createUser(user);
      res.status(201).json({ message: 'User created successfully', status:201 });
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }
];

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.json({message: 'Get user successfully', status:200, user:user});
  } catch (error) {
    res.status(500).json({ message: error.message, status:500 });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userService.login(email, password);

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password', status:401 });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', status: 200, user: { id: user.id, role: user.role }, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};

exports.updateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().isEmail().withMessage('Invalid email address'),
  body('role').notEmpty().withMessage('Invalid role'),
  body('phone').notEmpty().withMessage('Invalid phone number'),
  body('photo').optional(),
  body('position').notEmpty().withMessage('Position is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Invalid request body', status: 400, errors: errors.array() });
    }

    try {
      const id = req.params.id;
      const user = req.body;

      if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }

      await userService.updateUser(id, user);
      res.status(200).json({ message: 'User updated successfully', status: 200 });
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }
];

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userService.deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully', status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500});
  }
};

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000 // Limit file size to 10MB
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('photo');

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only JPG, JPEG, and PNG files are allowed.');
  }
}

exports.uploadPhoto = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err, status:400 });
    } else {
      // Check if file is uploaded
      if (req.file) {
        res.json({ message: 'File uploaded successfully', fileName: req.file.filename });
      } else {
        res.status(400).json({ message: 'No file uploaded', status:400 });
      }
    }
  });
};

