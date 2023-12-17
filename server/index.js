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
  password: '', 
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


app.get('/kategori', (req, res) => {
  db.query('SELECT kategori FROM produk GROUP BY kategori', (err, results) => {
    if (err) {
      throw err;
    }

    res.status(200).json(results);
  });
});

// PRODUK
app.get('/produk', (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) {
      throw err;
    }

    res.status(200).json(results);
  });
});

//TAMBAH PRODUK
app.post('/add-produk', (req, res) => {
  const { kategori, foto } = req.body;
  db.query(
    'INSERT INTO produk (kategori, foto) VALUES (?,?)',
    [kategori, foto],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: 'Successfully registered user' });
    }
  );
});


//EDIT PRODUK
app.post('/edit-produk', (req, res) => {
  const { kategori, foto, id_produk } = req.body;
  db.query(
    'UPDATE produk SET kategori = ?, foto = ? WHERE id_produk = ? ',
    [kategori, foto, id_produk],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: 'Successfully edit' });
    }
  );
});

//HAPUS PRODUK
app.post('/hapus-produk', (req, res) => {
  const {id_produk} = req.body;
  db.query(
    'DELETE FROM produk WHERE id_produk = ?',
    [id_produk],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: 'Successfully Delete' });
    }
  );
});

app.get('/account', (req, res) => {
  db.query('SELECT * FROM account', (err, results) => {
    if (err) {
      throw err;
    }

    res.status(200).json(results);
  });
});

app.get('/transaksi', (req, res) => {
  db.query('SELECT t.invoice, DATE_FORMAT(t.tanggal, "%d-%m-%Y") AS tanggal, a.nama AS customer, t.total FROM transaksi t JOIN account a ON t.id_account = a.id_account', (err, results) => {
    if (err) {
      throw err;
    }

    res.status(200).json(results);
  });
});

//Transaksi
app.get('/transaksi', (req, res) => {
  db.query('SELECT * FROM transaksi', (err, results) => {
    if (err) {
      throw err;
    }

    res.status(200).json(results);
  });
});

//TAMBAH transaksi
app.post('/add-transaksi', (req, res) => {
  const { invoice, tanggal, id_account, total } = req.body;
  db.query(
    'INSERT INTO transaksi (invoice, tanggal, id_account, total) VALUES (?,?,?,?)',
    [invoice, tanggal, id_account, total],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: 'Successfully Add Transaksi' });
    }
  );
});

//EDIT TRANSAKSI
app.post('/edit-transaksi', (req, res) => {
  const { tanggal, id_account, total, invoice } = req.body;
  db.query(
    'UPDATE transaksi SET tanggal = ?, id_account = ?, total = ? WHERE invoice = ?',
    [ tanggal, id_account, total, invoice],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: 'Successfully edit' });
    }
  );
});

//HAPUS TRANSAKSI
app.post('/hapus-transaksi', (req, res) => {
  const {invoice} = req.body;
  db.query(
    'DELETE FROM transaksi WHERE invoice = ?',
    [invoice],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: 'Successfully Delete' });
    }
  );
});