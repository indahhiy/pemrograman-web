import React, { useState, useEffect } from 'react';

// === Simulasi API Service ===
// Di aplikasi nyata, ini akan menjadi panggilan ke backend Anda (misalnya, Express.js).
// Untuk tujuan demo ini, kita akan menggunakan data dummy dan setTimeout
// untuk mensimulasikan penundaan jaringan.
const apiService = {
  async fetchItems() {
    const resultPromise = await fetch('http://localhost:3001/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await resultPromise.json();
    console.log(response);

    return response.data.results;
  },

  // Menghapus item berdasarkan ID
  async deleteItem(id) {
    return fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// === Komponen DataTable ===
// Komponen ini bertanggung jawab untuk merender tabel data.
// Ia menerima 'items' dan 'onDeleteItem' sebagai props dari komponen induk.
// Props adalah cara utama untuk meneruskan data dan fungsi dari komponen induk ke anak.
const DataTable = ({ items, onDeleteItem }) => {
  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Rendering List: Menggunakan metode .map() untuk mengulang array 'items' */}
          {/* dan merender baris tabel (<tr>) untuk setiap item. */}
          {items.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 whitespace-nowrap text-center text-gray-500 text-sm italic"
              >
                Tidak ada data.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                {' '}
                {/* Key adalah prop khusus yang membantu React mengidentifikasi setiap item dalam daftar secara unik. Penting untuk performa dan stabilitas. */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => onDeleteItem(item.id)} // Memanggil fungsi onDeleteItem yang diterima dari props
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// === Komponen Utama: App ===
// Ini adalah komponen induk yang mengelola state global aplikasi dan logika pengambilan data.
export default function App() {
  // 1. State Management (`useState`):
  // 'data' akan menyimpan array item yang diambil dari API.
  // 'setData' adalah fungsi yang digunakan untuk memperbarui nilai 'data'.
  // Nilai awal adalah array kosong `[]`.
  const [data, setData] = useState([]);
  // 'loading' menunjukkan apakah data sedang dimuat.
  const [loading, setLoading] = useState(true);
  // 'error' akan menyimpan pesan kesalahan jika terjadi.
  const [error, setError] = useState(null);

  // 2. Lifecycle dengan `useEffect`:
  // Hook `useEffect` digunakan untuk melakukan "efek samping" (side effects),
  // seperti pengambilan data, langganan event, atau manipulasi DOM langsung.
  // Dalam kasus ini, kita menggunakannya untuk mengambil data saat komponen dimuat (mount).
  useEffect(() => {
    // Fungsi asinkron untuk mengambil data
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading ke true sebelum memulai fetching
        setError(null); // Reset error
        const items = await apiService.fetchItems(); // Panggil API service
        setData(items); // Perbarui state 'data' dengan item yang diterima
      } catch (err) {
        console.error('Gagal mengambil data:', err);
        setError('Gagal memuat data. Silakan coba lagi.'); // Set pesan error
      } finally {
        setLoading(false); // Set loading ke false setelah fetching selesai (berhasil atau gagal)
      }
    };

    fetchData(); // Panggil fungsi fetchData saat komponen dimuat

    // Array dependensi kosong `[]` berarti efek ini hanya akan dijalankan
    // *sekali* setelah render pertama, mirip dengan `componentDidMount` pada kelas komponen.
    // Jika ada variabel di dalam array ini, efek akan dijalankan ulang
    // setiap kali nilai variabel tersebut berubah.
  }, []);

  // Handler untuk menghapus item. Fungsi ini akan diteruskan sebagai props ke DataTable.
  const handleDeleteItem = async (id) => {
    try {
      setLoading(true); // Tampilkan indikator loading saat menghapus
      setError(null); // Bersihkan error sebelumnya
      await apiService.deleteItem(id); // Panggil API untuk menghapus
      // Setelah berhasil dihapus di "backend" (simulasi),
      // kita perbarui state 'data' secara lokal untuk mencerminkan perubahan.
      // Ini penting agar UI diperbarui tanpa harus me-reload halaman.
      setData((prevData) => prevData.filter((item) => item.id !== id));
      console.log(`Item dengan ID ${id} berhasil dihapus dari UI.`);
    } catch (err) {
      console.error('Gagal menghapus item:', err);
      setError(`Gagal menghapus item: ${err.message}`); // Tampilkan pesan error spesifik
    } finally {
      setLoading(false); // Sembunyikan indikator loading
    }
  };

  // Rendering Kondisional:
  // Kita menampilkan UI yang berbeda tergantung pada status loading atau error.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-blue-600">Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Setelah data berhasil dimuat dan tidak ada error,
  // komponen ini akan merender judul dan DataTable.
  // Data dan fungsi handler diteruskan sebagai props ke DataTable.
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
          Daftar Item Produk
        </h1>
        {/* Meneruskan 'data' (state) dan 'handleDeleteItem' (fungsi) sebagai props ke DataTable */}
        <DataTable items={data} onDeleteItem={handleDeleteItem} />
        <p className="text-center text-gray-600 text-sm mt-8">
          Aplikasi ini mendemonstrasikan konsep dasar React: State, Props,
          Lifecycle (useEffect), dan Rendering.
        </p>
      </div>
    </div>
  );
}