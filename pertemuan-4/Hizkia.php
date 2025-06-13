<?php
// Konfigurasi koneksi
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'toko_budaya';

// Buat koneksi
$conn = new mysqli($host, $user, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Ambil data produk
$sql = "SELECT * FROM produk";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Daftar Produk</title>
    <style>
        table { border-collapse: collapse; width: 50%; margin: 20px auto; }
        th, td { padding: 10px; border: 1px solid #999; text-align: center; }
    </style>
</head>
<body>
    <h2 style="text-align: center;">Daftar Produk</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Harga</th>
        </tr>
        <?php if ($result->num_rows > 0): ?>
            <?php while($row = $result->fetch_assoc()): ?>
            <tr>
                <td><?= $row["id"] ?></td>
                <td><?= $row["nama"] ?></td>
                <td>Rp <?= number_format($row["harga"], 0, ',', '.') ?></td>
            </tr>
            <?php endwhile; ?>
        <?php else: ?>
            <tr><td colspan="3">Tidak ada produk</td></tr>
        <?php endif; ?>
    </table>
</body>
</html>

<?php
$conn->close();
?>
