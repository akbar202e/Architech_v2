const express = require('express');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/client/uploads', express.static(path.join(__dirname, 'client', 'uploads')));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

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
          { email: results[0].email, role: results[0].role, nama: results[0].nama },
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


app.post('/edit-password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

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
          .json({ message: 'Email is not found' });
      }

      bcrypt.compare(oldPassword, results[0].password, (err, match) => {
        if (err) {
          throw err;
        }

        if (!match) {
          return res
            .status(401)
            .json({ message: 'Old password is invalid' });
        }

        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            throw err;
          }

          db.query(
            'UPDATE account SET password = ? WHERE email = ?',
            [hash, email],
            (err) => {
              if (err) {
                throw err;
              }
              res.status(200).json({ message: 'Password updated successfully' });
            }
          );
        });
      });
    }
  );
});


app.get('/getUser', verifyToken, (req, res) => {
  db.query(
    'SELECT nama, hp, password FROM account WHERE email = ?',
    [req.email],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ nama: results[0].nama, hp: results[0].hp, password: results[0].password  });
    }
  );
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


app.get('/image', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'uploads', 'artwork (1).png'));
});
//TAMBAH PRODUK
// app.post('/add-produk', (req, res) => {
//   const { kategori } = req.body;
//   const image = req.files.image;
//   app.use('/client/uploads', express.static(path.join(__dirname, '..', 'client', 'uploads')));

//   // Use the mv() method to place the file in the "uploads" directory
//   image.mv(path.join(__dirname, '..', 'client', 'uploads', image.name), (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
  
//     const image_path = `http://localhost:3001/client/uploads/${image.name}`;
  
//     db.query(
//       'INSERT INTO produk (kategori, image_path) VALUES (?,?)',
//       [kategori, image_path],
//       (err) => {
//         if (err) {
//           throw err;
//         }
//         res.status(201).json({ message: 'Successfully added produk' });
//       }
//     );
//   });
// });

app.use('/client/uploads', express.static(path.join(__dirname, '..', 'client', 'uploads')));

// Add Product
app.post('/add-produk', (req, res) => {
  const { kategori } = req.body;
  const image = req.files.image;

  image.mv(path.join(__dirname, '..', 'client', 'uploads', image.name), (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    const image_path = `http://localhost:3001/client/uploads/${image.name}`;

    db.query(
      'INSERT INTO produk (kategori, image_path) VALUES (?,?)',
      [kategori, image_path],
      (err) => {
        if (err) {
          throw err;
        }
        res.status(201).json({ message: 'Successfully added produk' });
      }
    );
  });
});

// Edit Product
app.post('/edit-produk', (req, res) => {
  const {id_produk} = req.body;
  const { kategori } = req.body;
  const image = req.files.image;

  // Check if image is provided
  if (image) {
    // Delete the previous image
    db.query('SELECT image_path FROM produk WHERE id_produk = ?', [id_produk], (err, results) => {
      if (err) {
        throw err;
      }
      const previousImage = results[0].image_path;
      const filename = previousImage.split('/').pop();
      const filePath = path.join(__dirname, '..', 'client', 'uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        // Proceed with updating the product with the new image
        image.mv(path.join(__dirname, '..', 'client', 'uploads', image.name), (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          const newImagePath = `http://localhost:3001/client/uploads/${image.name}`;
          // Update the product with the new image path
          db.query(
            'UPDATE produk SET kategori=?, image_path=? WHERE id_produk=?',
            [kategori, newImagePath, id_produk],
            (err) => {
              if (err) {
                throw err;
              }
              res.status(200).json({ message: 'Successfully updated produk' });
            }
          );
        });
      });
    });
  } else {
    // If no new image is provided, update only the kategori
    db.query(
      'UPDATE produk SET kategori=? WHERE id_produk=?',
      [kategori, id_produk],
      (err) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: 'Successfully updated produk' });
      }
    );
  }
});

// Delete Product
app.post('/hapus-produk', (req, res) => {
  const {id_produk} = req.body;
  // Check if the product exists
  db.query('SELECT * FROM produk WHERE id_produk = ?', [id_produk], (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const image_path = results[0].image_path;

    // Delete the file
    const filename = image_path.split('/').pop();
    const filePath = path.join(__dirname, '..', 'client', 'uploads', filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Delete the product from the database
      db.query('DELETE FROM produk WHERE id_produk = ?', [id_produk], (err) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: 'Successfully deleted produk' });
      });
    });
  });
});

app.get('/account', (req, res) => {
  db.query('SELECT * FROM account', (err, results) => {
    if (err) {
      throw err;
    }

    res.status(200).json(results);
  });
});


app.post("/add-account", (req, res) => {
  const { nama, email, hp, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      throw err;
    }
    db.query(
      "INSERT INTO account (nama, email, hp, password) VALUES (?, ?, ?, ?)",
      [nama, email, hp, hash],
      (err) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: "Successfully registered user" });
      }
    );
  })
});

app.post("/edit-account", (req, res) => {
  const { nama, hp, email } = req.body;
  db.query(
    "UPDATE account SET nama = ?, hp = ? WHERE email = ? ",
    [nama, hp, email],
    (err) => {
      if (err) {
        throw err;
      }
      res.status(201).json({ message: "Successfully edit" });
    }
  );
});

app.post("/hapus-account", (req, res) => {
  const { email } = req.body;
  db.query("DELETE FROM account WHERE email = ?", email, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ message: "Successfully Delete" });
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

app.post("/contact", (req, res) => {
  const { nama, email, pesan } = req.body;
    db.query(
      "INSERT INTO contact (nama, email, pesan) VALUES (?, ?, ?)",
      [nama, email, pesan],
      (err) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: "Berhasil mengirim pesan" });
      }
    );
  });