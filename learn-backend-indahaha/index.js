const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());

// Buat koneksi langsung di sini
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'demo_api'
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL (demo_api)');
});

// GET semua item
app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.json(results);
  });
});

// GET item by ID
app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// POST tambah item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO items (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(201).json({ id: result.insertId, name });
  });
});

// PUT edit item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query('UPDATE items SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json({ id, name });
    }
  });
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Item not found' });
    } else {
      res.json({ message: 'Item deleted', id });
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
