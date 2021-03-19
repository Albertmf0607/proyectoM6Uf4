<?php

usleep(500000);
$nom = $_REQUEST["nom"];
if (trim($nom) == "") {
    echo 'El nom no pot estar buit.';
} else {
    echo '';
}
?>