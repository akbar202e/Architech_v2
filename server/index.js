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
  host: 'localhost', // alterar para o seu host
  user: 'root', // alterar para o seu usuário
  password: 'root', // alterar para a sua senha
  database: 'architech', // alterar para o seu banco de dados
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database!');
});

// Rota de registro de usuário
app.post('/register', (req, res) => {
  const { nama, email, hp, password } = req.body;

  // Verificar se o usuário já existe
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

      // Criptografar a senha antes de armazená-la no banco de dados
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          throw err;
        }

        // Salvar o usuário no banco de dados
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

// Rota de login de usuário
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe no banco de dados
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

      // Comparar a senha fornecida com a senha armazenada no banco de dados
      bcrypt.compare(password, results[0].password, (err, match) => {
        if (err) {
          throw err;
        }

        if (!match) {
          return res
            .status(401)
            .json({ message: 'Email or password is invalid' });
        }

        // Gerar um token JWT
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

// Função de middleware para verificar o token
function verifyToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não fornecido' });
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

// Rota protegida
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
  // Select the required columns from the 'produk' table
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) {
      throw err;
    }

    // Send the results as JSON
    res.status(200).json(results);
  });
});
