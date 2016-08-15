<?php
	require_once("db.php");
	$conn = mysqli_connect($db_hostname, $db_username, $db_password, $db_name) or die("Can't connect to database");
	mysqli_set_charset($conn,"utf8");
?>