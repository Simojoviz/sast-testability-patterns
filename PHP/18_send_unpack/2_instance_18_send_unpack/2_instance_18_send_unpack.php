<?php
// $a = 1, $b = $b the input
function add($a, $b) {
    return $b;
}

$b = $_GET["p1"]; // source
$a = [1, $b];
$c = add(...$a); // tarpit
echo $c; // sink