<?php
function F_something($var){
    return $var;
}

$a = $_GET["p1"];
$b = call_user_func($func . "_something", $a);
echo $b;