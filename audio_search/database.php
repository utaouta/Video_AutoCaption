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


$word_to_update = $_POST['result'];
if(!$conn )
{
    die('Failed to connect: ' . mysqli_error($conn));
}
updateDatabase($conn,$word_to_update);
mysqli_close($conn);

function updateDatabase($conn,$word_to_updated){
    mysqli_query($conn , "set names utf8");

    $sql = "SELECT WORD
        FROM topsearch WHERE WORD = '$word_to_updated'";
    mysqli_select_db( $conn, 'testdb' );
    $retval = mysqli_query( $conn, $sql );
    $row = mysqli_fetch_array($retval, MYSQLI_ASSOC);
    if($row['WORD'] != $word_to_updated){
        $sql = "INSERT INTO topsearch (WORD, WORDCOUNT) VALUES ('$word_to_updated', 1)";
        mysqli_query($conn,$sql);
    }
    else $sql = "UPDATE topsearch SET WORDCOUNT = WORDCOUNT + 1 WHERE WORD = '$word_to_updated'";
    mysqli_query($conn,$sql);
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

}

?>
