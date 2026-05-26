<?php

session_start();

require __DIR__ . "/../create/db.php";

$data=json_decode(
file_get_contents("php://input"),true);
$username=
$data["username"];
$password=
$data["password"];
$stmt=$db->prepare("SELECT * FROM users WHERE username = ?");


$stmt->execute([$username]);
$user=$stmt->fetch();

if($user &&password_verify($password,$user["password"])){
$_SESSION["user_id"]=$user["id"];
$_SESSION["username"]=$user["username"];
echo "OK";
}

else{echo "Špatné údaje";}
?>