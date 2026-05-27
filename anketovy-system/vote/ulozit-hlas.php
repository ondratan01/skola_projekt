<?php

require "../create/db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$answers = $data["answers"];

foreach($answers as $a)
{
    $stmt = $db->prepare("
        INSERT INTO answers(
            question_id,
            answer
        )

        VALUES(?,?)
    ");

    $stmt->execute([
        $a["question_id"],
        $a["answer"]
    ]);
}

echo "Hlas uložen";

?>