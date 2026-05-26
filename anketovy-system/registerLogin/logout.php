<?php
session_start();
session_destroy();
header( __DIR__ . "/../dashboard/index.html");
exit();
?>