<?php
session_start();

?>



<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tvorba anket</title>
<link rel="stylesheet" href="index-style.css">
</head>
<body>

  <header>

  </header>
    
<section id="intro" class="page">
  <h1 id="h1">Anketa Creator</h1>

  <div class="cards">

    


<?php if(isset($_SESSION["user_id"])): ?>

<a href="/skola_projekt/anketovy-system/registerLogin/check-login.php"
  class="card">

<?php else: ?>

<a href="/skola_projekt/anketovy-system/registerLogin/check-login.php"
   class="card"
   onclick="return confirm('Pro vytvoření ankety se musíte přihlásit. Chcete pokračovat?')">

<?php endif; ?>








    <div>
      <h2>Vytvořit anketu</h2>
      <p>Navrhni vlastní otázky</p>
    </div>

    </a>


    <a href="/skola_projekt/anketovy-system/vote/hlasovat.html" 
    class="card">
    <div>
      <h2>Hlasovat</h2>
      <p>Hlasuj v anketě</p>
    </div>
    </a>
  </div>
</section>
<br><br><br>
<h2 class="popis">
Jednoduchý nástroj pro tvorbu a sběr anket
</h2>
<h3>
  Vytvářej otázky, sdílej anketu a sleduj výsledky.
</h3>

<div class="top-right">

<?php if(isset($_SESSION["user_id"])): ?>

  <div class="welcome">
    <?= $_SESSION["username"] ?>
</div>


    <a href="/skola_projekt/anketovy-system/dashboard/profil.php"
        class="top-btn">
        Profil
    </a>

   


    <a href="../registerLogin/logout.php"
    class="top-btn logout"
    onclick="return confirm('Opravdu se chcete odhlásit?')">
    Odhlásit se
</a>



<?php else: ?>

    <a
        href="/skola_projekt/anketovy-system/registerLogin/login.html"
        class="top-btn"
    >
        Přihlásit
    </a>

    <a
        href="/skola_projekt/anketovy-system/registerLogin/register.html"
        class="top-btn"
    >
        Registrace
    </a>

<?php endif; ?>

</div>



<script src="index-script.js"></script>
</body>
</html>