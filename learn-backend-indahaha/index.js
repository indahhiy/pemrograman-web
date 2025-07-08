const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

// Database connection
let db;

(async () => {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'demo_api'
    });

    console.log('✅ Terhubung ke database (demo_api)');

    // Routes
    // GET semua user
    app.get('/api/users', async (req, res) => {
      try {
        const [results] = await db.query('SELECT id, nama, nim, email FROM users');
        res.json({ status: 'success', data: results });
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
      }
    });

    // GET user berdasarkan ID
    app.get('/api/users/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const [results] = await db.query('SELECT id, nama, nim, email FROM users WHERE id = ?', [id]);
        
        if (results.length === 0) {
          return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        
        res.json({ status: 'success', data: results[0] });
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
      }
    });

    // POST tambah user
    app.post('/api/users', async (req, res) => {
      try {
        const { nama, nim, email } = req.body;
        
        if (!nama || !nim || !email) {
          return res.status(400).json({ message: 'Nama, NIM, dan Email wajib diisi' });
        }

        const [result] = await db.query(
          'INSERT INTO users (nama, nim, email) VALUES (?, ?, ?)', 
          [nama, nim, email]
        );

        res.status(201).json({
          status: 'success',
          message: 'User berhasil ditambahkan',
          data: { id: result.insertId, nama, nim, email }
        });
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
      }
    });

    // PATCH update user
    app.patch('/api/users/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const { nama, nim, email } = req.body;

        if (!nama && !nim && !email) {
          return res.status(400).json({ message: 'Minimal satu field (nama, nim, atau email) harus diisi' });
        }

        let fields = [];
        let values = [];

        if (nama) {
          fields.push('nama = ?');
          values.push(nama);
        }
        if (nim) {
          fields.push('nim = ?');
          values.push(nim);
        }
        if (email) {
          fields.push('email = ?');
          values.push(email);
        }

        values.push(id);
        const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

        const [result] = await db.query(sql, values);

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.json({
          status: 'success',
          message: 'User berhasil diperbarui',
          data: { id, ...req.body }
        });
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
      }
    });

    // DELETE user
    app.delete('/api/users/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        res.json({
          status: 'success',
          message: 'User berhasil dihapus',
          data: { id }
        });
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Database error', error: err.message });
      }
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('❌ Gagal terhubung ke database:', err);
    process.exit(1);
  }
})();