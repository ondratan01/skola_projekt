<?php

require "../create/db.php";

$code = $_GET["code"];

$stmt = $db->prepare("
    SELECT *
    FROM polls
    WHERE code = ?
");

$stmt->execute([
    $code
]);

$poll = $stmt->fetch();

echo json_encode($poll);

?>