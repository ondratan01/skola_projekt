<?php

require "../create/db.php";

$code = $_GET["code"];


// nacteni ankety
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


// nacteni questions
$stmt = $db->prepare("
    SELECT *
    FROM questions
    WHERE poll_id = ?
");

$stmt->execute([
    $poll["id"]
]);

$questions = $stmt->fetchAll(PDO::FETCH_ASSOC);


// nacteni optionů
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



echo json_encode([
    "poll" => $poll,
    "questions" => $questions
]);

?>