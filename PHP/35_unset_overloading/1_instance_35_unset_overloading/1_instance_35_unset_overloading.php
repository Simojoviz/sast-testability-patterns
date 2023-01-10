<?php

class PropertyTest
{
    private $x = 'safe';

    public function __get($name)
    {
        return $this->var;
    }

    public function setx($b)
    {
        $this->x = $b;
    }

    public function __unset($name)
    {
        echo "Unsetting " . $this->x;
    }
}

$b = $_GET["p1"];
$obj = new PropertyTest;
$obj->var = $b;
$obj->setx($b);
// will call __unset() function, XSS vulnerability
unset($obj->x);