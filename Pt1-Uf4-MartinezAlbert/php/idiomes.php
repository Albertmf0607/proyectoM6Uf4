<?php

$idioma = $_REQUEST['idioma'];

switch ($idioma) {
    case "ca":
        $idioma = "Idioma";
        $nickname = "Nom d'usuari";
        $nom = "Nom";
        $dni = "DNI";
        $provincia = "Província";
        $municipi = "Població";
        $domicili = "Domicili";
        $ubicacio = "Ubicació";
        $ruta = "Ruta";
        break;
    case "es":
        $idioma = "Idioma";
        $nickname = "Nombre de usuario";
        $nom = "Nombre";
        $dni = "DNI";
        $provincia = "Provincia";
        $municipi = "Poblacion";
        $domicili = "Domicilio";
        $ubicacio = "Ubicación";
        $ruta = "Ruta";
        break;
    case "en":
        $idioma = "Language";
        $nickname = "Nickname";
        $nom = "Name";
        $dni = "DNI";
        $provincia = "Province";
        $municipi = "Town";
        $domicili = "Address";
        $ubicacio = "Location";
        $ruta = "Route";
        break;
    default:
        $idioma = "Error PHP";
        $nickname = "Error PHP";
        $nom = "Error PHP";
        $dni = "Error PHP";
        $provincia = "Error PHP";
        $municipi = "Error PHP";
        $domicili = "Error PHP";
        $ubicacio = "Error PHP";
        $ruta = "Error PHP";
}

//foreach ($provincias as $codigo => $nombre) {
//    $elementos_json[] = "{\"codigo\":\"$codigo\",\"nombre\":\"$nombre\"}";
//}

echo "{\"idioma\":\"$idioma\",\"nickname\":\"$nickname\",\"nom\":\"$nom\",\"dni\":\"$dni\",\"provincia\":\"$provincia\",\"municipi\":\"$municipi\",\"domicili\":\"$domicili\",\"ubicacio\":\"$ubicacio\",\"ruta\":\"$ruta\"}";

//echo "{\"provincias\":[" . implode(",", $elementos_json) . "]}";
?>
