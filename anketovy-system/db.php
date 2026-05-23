<?php
try{
    $db = new PDO("mysql:host=localhost;dbname=anketa_system",
    "root",
    "");
    $db->setAttribute(PDO::ATTR_ERRMODE,
    PDO::ERRMODE_EXCEPTION);
}

catch(PDOException $e)
{
    die("Chyba DB: ".$e->getMessage());
}

$stmt = $db->query("SELECT * FROM users");

$data = $stmt->fetchAll();

print_r($data);

?>