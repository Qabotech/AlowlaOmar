<?php
$serverName = "sql106.epizy.com";
$DBUName = "epiz_32201422";
$DBPass = "sZ5vJFCl6LOOCs";
$DBName = "epiz_32201422_td";


$conn = mysqli_connect($serverName, $DBUName, $DBPass, $DBName);
if (!$conn) {
    die("ERROR: " . mysqli_connect_error());
}
if (isset($_POST["send"])) {

    $uname = mysqli_escape_string($conn, $_POST["uname"]);
    $email = mysqli_escape_string($conn, $_POST["email"]);
    $msg = mysqli_escape_string($conn, $_POST["msg"]);


    $sql = "INSERT INTO anfragen (uname, email, msg)
        VALUES ('$uname', '$email', '$msg' )";

    if (mysqli_query($conn, $sql)) {
        header('location: https://inspiring-lebkuchen-26fe23.netlify.app/');
        exit();
    } else {
        echo 'ERR' . mysqli_error($conn);
    }

}