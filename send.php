<?php
$serverName = "localhost";
$DBUName = "root";
$DBPass = "!QTdb404";
$DBName = "mymsgs";


$conn = mysqli_connect($serverName, $DBUName, $DBPass, $DBName);
if (!$conn) {
    die("ERROR: " . mysqli_connect_error());
}
if(isset($_POST['send'])) {
    // Include database connection file

    // Get form data
    $uname = $_POST['uname'];
    $email = $_POST['email'];
    $msg = $_POST['msg'];

    // Insert data into database
    $sql = "INSERT INTO msgs (Name, Email, Message) VALUES (?, ?, ?)";
    $stmt = mysqli_stmt_init($conn);
    if(mysqli_stmt_prepare($stmt, $sql)) {
        mysqli_stmt_bind_param($stmt, "sss", $uname, $email, $msg);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        // Redirect to success page or show success message
        header("Location: index.html#true");
        exit();
    } else {
        // Handle database error
        echo "Error: " . mysqli_error($conn);
    }
} else {
    // Redirect if form is not submitted
    header("Location: index.html#false");
    exit();
}
?>