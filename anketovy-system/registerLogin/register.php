<?php

require "db.php";

$data=json_decode(
file_get_contents(
"php://input"
),
true
);

$username=
$data["username"];

$password=
password_hash(
$data["password"],
PASSWORD_DEFAULT
);


$stmt=
$db->prepare(

"INSERT INTO users(
username,
password
)

VALUES(?,?)"

);

$stmt->execute([

$username,
$password

]);

echo "Registrace hotová";

?>