<?php

require "../create/db.php";

$pollId = $_GET["id"];



// nacteni ankety
$stmt = $db->prepare("
    SELECT *
    FROM polls
    WHERE id = ?
");

$stmt->execute([$pollId]);

$poll = $stmt->fetch();



// otazky
$stmt = $db->prepare("
    SELECT *
    FROM questions
    WHERE poll_id = ?
");

$stmt->execute([$pollId]);

$questions = $stmt->fetchAll();

?>

<!DOCTYPE html>
<html lang="cs">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        Výsledky
    </title>

    <link
        rel="stylesheet"
        href="vysledky-style.css"
    >

</head>

<body>

<div class="content">









<h1>
    Výsledky:
    <?= $poll["name"] ?>
</h1>



<a
    class="btn"
    href="../dashboard/profil.php"
>
    Zpět
</a>



<hr>

<?php foreach($questions as $q): ?>

    <div class="question">

<h3>
        <?= $q["text"] ?>
    </h3>

    <?php

    // odpovedi
    $stmt = $db->prepare("
        SELECT
            answer,
            COUNT(*) as total

        FROM answers

        WHERE question_id = ?

        GROUP BY answer
    ");

    $stmt->execute([
        $q["id"]
    ]);

    $results = $stmt->fetchAll();

    ?>



    <?php foreach($results as $r): ?>

        <p>
            <?= $r["answer"] ?>
            —
            <?= $r["total"] ?> hlasů
        </p>

    <?php endforeach; ?>

    

<?php endforeach; ?>

</div>

</body>
</html>