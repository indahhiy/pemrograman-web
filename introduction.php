<?php
date_default_timezone_set("Asia/Jakarta"); // Set your timezone

$hour = date("H");

if ($hour < 12) {
    $greeting = "Selamat pagi!";
} elseif ($hour < 18) {
    $greeting = "Selamat sore!";
} else {
    $greeting = "Selamat malam!";
}

echo $greeting . " Semoga harimu menyenangkan.";
?>