<?php
session_start();

if(!isset($_SESSION["user_id"]))
{
    exit("Nejste přihlášen.");
}




require "db.php";

try
{

    $db->beginTransaction();

    $data = json_decode(
        file_get_contents("php://input"),
        true
    );

    $nazev = $data["nazev"];
    $otazky = $data["otazky"];


    //////////////


    $code = strtoupper(substr(md5(uniqid()),0,6));



    $stmt = $db->prepare(
    "INSERT INTO polls(
        user_id,
        name,
        code)
    VALUES(?,?,?)"
    );

    $stmt->execute([

        $_SESSION["user_id"],
        $nazev,
        $code
    ]);

    ///////////////
///////////////

// $stmt = $db->prepare(
// "INSERT INTO polls(name)
// VALUES(?)"
// );




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

    //////////////

    $db->commit();

    echo "Anketa uložena";

    //////////////

}

catch(Exception $e)
{

    $db->rollBack();

    echo "Chyba: ".$e->getMessage();

}

?>