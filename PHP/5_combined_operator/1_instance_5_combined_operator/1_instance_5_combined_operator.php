<?php
$a = ($b = $_GET["p1"]) . " safe"; // source & tarpit
echo $b; // sink