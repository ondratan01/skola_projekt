<?php

require "../create/db.php";

$code = $_GET["code"];


// načtení ankety
$stmt = $db->prepare("
    SELECT *
    FROM polls
    WHERE code = ?
");

$stmt->execute([$code]);

$poll = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$poll)
{
    echo json_encode([
        "error" => "Anketa nenalezena"
    ]);
    exit;
}


// načtení otázek
$stmt = $db->prepare("
    SELECT *
    FROM questions
    WHERE poll_id = ?
");

$stmt->execute([
    $poll["id"]
]);

$questions = $stmt->fetchAll(PDO::FETCH_ASSOC);


// načtení možností ke každé otázce
foreach($questions as &$q)
{
    $stmt = $db->prepare("
        SELECT *
        FROM options
        WHERE question_id = ?
    ");

    $stmt->execute([
        $q["id"]
    ]);

    $q["options"] =
        $stmt->fetchAll(PDO::FETCH_ASSOC);
}


// finální JSON
echo json_encode([
    "poll" => $poll,
    "questions" => $questions
]);

?>