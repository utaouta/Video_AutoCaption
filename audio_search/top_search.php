
<?php
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = 'tingZhihua66';
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
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
   }


?>


