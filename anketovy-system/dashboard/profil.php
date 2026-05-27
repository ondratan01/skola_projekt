<?php

session_start();

require "../create/db.php";

// Načtení všech anket přihlášeného uživatele
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

    <link rel="stylesheet" href="dashboard.css">
</head>

<body>

    <h1>
        Profil: <?= $_SESSION["username"] ?>
    </h1>

    <a href="../create/vytvorit.html">
        Nová anketa
    </a>

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

            <a href="results.php?id=<?= $poll["id"] ?>">
                Výsledky
            </a>

        </div>

        <hr>

    <?php endforeach; ?>

    <a href="../registerLogin/logout.php">
        Odhlásit se
    </a>

</body>

</html>