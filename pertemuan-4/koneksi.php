<?php
$host = "localhost";
$user = "root";
$pass = ""; // Kosong jika pakai Laragon
$db   = "db_toko";

// Buat koneksi
$conn = mysqli_connect($host, $user, $pass, $db);

// Cek koneksi
if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
