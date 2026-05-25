<?php

require "db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$nazev = $data["nazev"];
$otazky = $data["otazky"];



$stmt = $db->prepare(
"INSERT INTO polls(name)
VALUES(?)"
);

$stmt->execute([$nazev]);

$pollId = $db->lastInsertId();



foreach($otazky as $o)
{
    $stmt = $db->prepare(
    "INSERT INTO questions(
    poll_id,
    text,
    type
    )

    VALUES(?,?,?)"
    );

    $stmt->execute([
        $pollId,
        $o["text"],
        $o["type"]
    ]);


    $questionId =
    $db->lastInsertId();



    foreach($o["moznosti"] as $m)
    {
        $stmt = $db->prepare(
        "INSERT INTO options(
        question_id,
        text
        )

        VALUES(?,?)"
        );

        $stmt->execute([
            $questionId,
            $m
        ]);
    }
}

echo "Anketa uložena";
?>