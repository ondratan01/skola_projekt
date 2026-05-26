<?php
session_start();

if(isset($_SESSION["user_id"])){
    header(
    "Location: /skola_projekt/anketovy-system/create/vytvorit.html"
    );
}

else{
    header(
    "Location: /skola_projekt/anketovy-system/registerLogin/login.html"
    );
}
exit();
?>