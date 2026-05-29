<?php

session_start();

if(!isset($_SESSION["user_id"]))
{
    header(
        "Location: ../registerLogin/login.html"
    );

    exit;
}



require "../create/db.php";

// nacteni vsech mych anket
$stmt = $db->prepare("
    SELECT *
    FROM polls
    WHERE user_id = ?
");

$stmt->execute([
    $_SESSION["user_id"]
]);

$polls = $stmt->fetchAll();

?>

<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Dashboard</title>

    <link rel="stylesheet" href="profil-style.css">
</head>

<body>

    <div class="top-panel">



    <strong>
        <?= $_SESSION["username"] ?>
    </strong>



    <a
        class="btn"
        href="../create/vytvorit.html"
    >
        Nová anketa
    </a>

    <a
        class="btn logout"
        href="../registerLogin/logout.php"
    >
        Odhlásit se
    </a>
    <a
        class="btn menu"
        href="../dashboard/index.html"
    >
        Menu
    </a>

</div>

<div class="content">

    <hr>

    <?php foreach ($polls as $poll): ?>

        <div class="poll">

            <h3>
                <?= $poll["name"] ?>
            </h3>

            <p>
                <strong>Kód:</strong>
                <?= $poll["code"] ?>
            </p>

            <a class="btn" href="../results/vysledky.php?id=<?= $poll["id"] ?>">
    Výsledky
</a>
<a
    class="btn"
    href="../results/smazat-anketu.php?id=<?= $poll["id"] ?>"

    onclick="
        return confirm(
            'Opravdu smazat anketu?'
        );
    "
>
    Smazat
</a>

        </div>

        <hr>

    <?php endforeach; ?>

    <!-- <a href="../registerLogin/logout.php">
        Odhlásit se
    </a> -->
</div>
</body>

</html>