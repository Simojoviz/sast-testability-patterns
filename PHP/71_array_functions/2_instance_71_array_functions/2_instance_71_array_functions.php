<?php
$val = $_GET["p1"]; // source
$input = array(12, 10, 9);

$result = array_pad($input, 5, $val);
echo $result[3]; // sink