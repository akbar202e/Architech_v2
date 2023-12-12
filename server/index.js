const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'root', 
  database: 'architech', 
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database!');
});

app.post('/register', (req, res) => {
  const { nama, email, hp, password } = req.body;

  db.query(
    'SELECT * FROM account WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: 'User already exists, try another username' });
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          throw err;
        }

        db.query(
          'INSERT INTO account (nama, email, hp, password) VALUES (?, ?, ?, ?)',
          [nama, email, hp, hash],
          (err) => {
            if (err) {
              throw err;
            }
            res.status(201).json({ message: 'Successfully registered user' });
          }
        );
      });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM account WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: 'Email or password is invalid' });
      }

      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) {
          throw err;
        }

        if (!match) {
          return res
            .status(401)
            .json({ message: 'Email or password is invalid' });
        }

        const token = jwt.sign(
          { email: results[0].email, role: results[0].role },
          'jwt',
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({ token });
      });
    }
  );
});

function verifyToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token tidak ada' });
  }

  const [, token] = authorization.split(' ');

  jwt.verify(token, 'jwt', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }

    req.email = decoded.email;
    req.role = decoded.role;
    next();
  });
}

app.get('/protected', verifyToken, (req, res) => {
  if(req.role !== 'admin'){
    return res.status(200).json({ message: 'Your Token is user' });
  }else{
    res.status(200).json({ message: 'Your Token is admin' });
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});


app.get('/produk', (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) {
      throw err;
    }

    res.status(200).json(results);
  });
});
