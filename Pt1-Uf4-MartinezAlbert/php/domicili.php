<?php

usleep(500000);
$domicili = $_REQUEST["domicili"];
if (trim($domicili) == "") {
    echo 'El domicili no pot estar buit.';
} else {
    echo '';
}
?>