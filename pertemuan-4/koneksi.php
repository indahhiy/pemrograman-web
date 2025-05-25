<?php
$conn = pg_connect("host=localhost dbname = demoform user=postgres password=root")

if (!$conn) {
    die("Connection failed");
}

$name = $_POST['fname'];
$email = $_POST['email'];
$phone = $_POST['gender'] ?? '';

$query = "INSERT INTO users (name, email, phone) VALUES ($1, $2, $3)";
$result = pg_query_params($conn, query, array($name, $email, $gender));

if ($result) {
    echo "Data inserted successfully";
} else {
    echo "Error inserting data";
}

pg_close($conn);
?>