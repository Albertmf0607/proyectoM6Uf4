<?php

usleep(500000);
$idioma=$_REQUEST["idioma"];
$nickname=$_REQUEST['nickname'];
$nom=$_REQUEST['nom'];
$dni=$_REQUEST['dni'];
$provincia=$_REQUEST['provincia'];
$municipi=$_REQUEST['municipi'];
$domicili=$_REQUEST['domicili'];

echo "{\"idioma\":\"$idioma\",\"nickname\":\"$nickname\",\"nom\":\"$nom\",\"dni\":\"$dni\",\"provincia\":\"$provincia\",\"municipi\":\"$municipi\",\"domicili\":\"$domicili\"}";
?>