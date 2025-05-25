<?php
include 'koneksi.php';

// Simpan data jika form disubmit
$pesan = "";
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['simpan'])) {
    $nama = $_POST['fname'];
    $email = $_POST['email'];

    $sql = "INSERT INTO pelanggan (nama, email) VALUES ('$nama', '$email')";
    if (mysqli_query($conn, $sql)) {
        $pesan = "✅ Data berhasil disimpan!";
    } else {
        $pesan = "❌ Error: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form & Data Pelanggan</title>

    <script>
        function validateForm() {
            let name = document.forms["myForm"]["fname"].value;
            let email = document.forms["myForm"]["email"].value;

            if (name == "") {
                alert("NAMA MU BELUM!!!!");
                return false;
            }

            if (email == "" || !email.includes("@")) {
                alert("ITU BUKAN EMAIL YANG VALID!!!!");
                return false;
            }

            return true;
        }
    </script>

    <style>
        body {
            background-color: #5b2a2a;
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        form, table {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto 20px auto;
        }

        input[type="text"], input[type="email"] {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border-radius: 4px;
            border: 1px solid #ccc;
        }

        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }

        h1, h2 {
            color: #fcfcfc;
            text-align: center;
        }

        .message-box {
            color: #fff;
            text-align: center;
            margin: 10px;
            font-weight: bold;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }

        th {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>

    <h1>FORM PELANGGAN</h1>

    <!-- Form Input -->
    <form name="myForm" method="post" onsubmit="return validateForm()">
        Nama : <br>
        <input type="text" name="fname" required><br>

        Email : <br>
        <input type="email" name="email" required><br>

        <input type="submit" name="simpan" value="Simpan">
    </form>

    <!-- Pesan -->
    <div class="message-box">
        <?php echo $pesan; ?>
    </div>

    <!-- Data Pelanggan -->
    <h2>DAFTAR PELANGGAN</h2>

    <table>
        <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
        </tr>
        <?php
        $sql = "SELECT * FROM pelanggan";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<tr>
                        <td>{$row['id']}</td>
                        <td>{$row['nama']}</td>
                        <td>{$row['email']}</td>
                    </tr>";
            }
        } else {
            echo "<tr><td colspan='3'>Belum ada data pelanggan.</td></tr>";
        }
        ?>
    </table>

</body>
</html>
