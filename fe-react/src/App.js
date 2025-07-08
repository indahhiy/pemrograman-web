import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus user ini?')) {
      try {
        await fetch(`http://localhost:3001/api/users/${id}`, {
          method: 'DELETE',
        });
        fetchUsers();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Daftar Pengguna</h1>
      
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <div className="user-info">
                <span className="user-id">{user.id}</span>
                <span className="user-name">{user.nama}</span>
                <span className="user-nim">{user.nim}</span>
                <span className="user-email">{user.email}</span>
              </div>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(user.id)}
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;