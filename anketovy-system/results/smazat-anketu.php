<?php

session_start();

require "../create/db.php";

$id = $_GET["id"];



try
{

    $db->beginTransaction();



    $stmt = $db->prepare("
        DELETE options
        FROM options

        JOIN questions
        ON options.question_id = questions.id

        WHERE questions.poll_id = ?
    ");

    $stmt->execute([$id]);



    $stmt = $db->prepare("
        DELETE answers
        FROM answers

        JOIN questions
        ON answers.question_id = questions.id

        WHERE questions.poll_id = ?
    ");

    $stmt->execute([$id]);



    $stmt = $db->prepare("
        DELETE FROM questions
        WHERE poll_id = ?
    ");

    $stmt->execute([$id]);



    $stmt = $db->prepare("
        DELETE FROM polls
        WHERE id = ?
        AND user_id = ?
    ");

    $stmt->execute([
        $id,
        $_SESSION["user_id"]
    ]);



    $db->commit();

    header(
        "Location: ../dashboard/profil.php"
    );

}
catch(Exception $e)
{

    $db->rollBack();

    echo $e->getMessage();

}