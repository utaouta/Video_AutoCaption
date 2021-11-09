<?php
$servername = "localhost";
$username = "root";
$password = "tingZhihua66";
$dbname = "TESTDB";


$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Fail to connect " . $conn->connect_error);
}

$sql = "SELECT time_tag, transcript FROM subtitle";
$result = $conn->query($sql);
$result_array = array();

    while($row = $result->fetch_assoc()) {
        $result_array[] = $row;
    }

//implode(" ",$result_array);
$little = json_encode($result_array);
echo $little;
$conn->close();






?>

