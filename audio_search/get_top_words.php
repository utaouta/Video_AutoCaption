<?php

$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = 'tingZhihua66';

$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
mysqli_select_db( $conn, 'testdb' );

$sql = "SELECT WORD
        FROM topsearch ORDER BY WORDCOUNT DESC LIMIT 0,3";

$result = $conn->query($sql);

$result_array = array();

    while ($row = $result->fetch_assoc()) {
        $result_array[] = $row;
    }

$little = json_encode($result_array);
 echo $little;
$conn->close();


?>
