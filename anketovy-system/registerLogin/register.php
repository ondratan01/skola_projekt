<?php

require __DIR__ . "/../create/db.php";

$data=json_decode(file_get_contents("php://input"),true);

$username=trim($data["username"]);

$password=password_hash($data["password"],PASSWORD_DEFAULT);


// kontrola
$stmt = $db->prepare("
    SELECT id
    FROM users
    WHERE username = ?
");

$stmt->execute([
    $username
]);

$user = $stmt->fetch();



// kdyz existuje
if($user)
{
    echo "Toto uživatelské jméno už existuje";
    exit;
}


$stmt=$db->prepare(
"INSERT INTO users(username,password)VALUES(?,?)");

$stmt->execute([$username,$password]);

echo "Registrace hotová";

?>