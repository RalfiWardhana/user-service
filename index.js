const express = require('express');
const app = express();
const port = 3020;
const userRoutes = require('./src/routes/index');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk mengizinkan permintaan dari domain yang berbeda
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', userRoutes);

const handleAuthError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized', status: 401 });
  }
  next();
};

app.use(handleAuthError);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
