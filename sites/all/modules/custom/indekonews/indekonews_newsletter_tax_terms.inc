<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 01.02.17
 * Time: 13:47
 */

function indekonews_create_taxonomy_for_newsletter($activity)
{

    $taxName = "";
    $taxDescription = "";

    //Anhand der vid wird der Name und die Beschreibung aus der Datenbank ermittelt
    $vocabular = db_query("SELECT * FROM {taxonomy_vocabulary} as tax WHERE tax.vid = :id",
        array(":id" => $activity->vid));

    foreach ($vocabular as $vocab) {
        $taxName = $vocab->name;
        $taxDescription = $vocab->description;
        $taxVID = $vocab->vid;
        $taxLink = "projekte-nach-dimension/" . $taxVID;
    }

    //Falls keine Beschreibung vorhanden ist, soll ein Standardtext erzeugt werden.
    if (!strcmp($taxDescription, "")) {
        $newTaxDes = "Keine Beschreibung vorhanden";
    } else {
        $newTaxDes = $taxDescription;
    }

    $CuttedDes = cutNewsDescription($newTaxDes);


    $dynamic_content = '
    <div class="dimension_erstellung wrap">
        <h2>Dimension <a href=' . $taxLink . '>' . $taxName . '</a> wurde erstellt
        </h2>
        <p>' . $CuttedDes . '<p>
    </div>
        ';

    return $dynamic_content;
}

function indekonews_create_term_for_newsletter($activity)
{
    $termName = "";
    $termDescription = "";
    $termDimension = "";

    //Name und Beschreibung werden ermittelt
    $term_data = db_query("SELECT * FROM {taxonomy_term_data} as tax WHERE tax.tid = :id",
        array(":id" => $activity->tid));

    foreach ($term_data as $t) {
        $termName = $t->name;
        $termDescription = $t->description;
        $termTID = $t->tid;
        $termVID = $t->vid;
    }

    //Die passende Dimension wird ermittelt
    $term_vocab = db_query("SELECT * FROM {taxonomy_vocabulary} as tax WHERE tax.vid = :id",
        array(":id" => $activity->vid));

    foreach ($term_vocab as $tv) {
        $termDimension = $tv->name;
    }

    //Link zum View: Alle Projekte, die die entsprechende TermID als Tag haben
    $termLink = "projekte-nach-auspr-gung/" . $termTID;
    $taxLink = "projekte-nach-dimension/" . $termVID;

    //Falls keine Beschreibung vorhanden ist, soll ein Standardtext erzeugt werden.
    if (!strcmp($termDescription, "")) {
        $newTermDes = "Keine Beschreibung vorhanden";
    } else {
        $newTermDes = $termDescription;
    }

    $CuttedTermDes = cutNewsDescription($newTermDes);

    $dynamic_content = '
    <div class="term_erstellung wrap">
        <h2>Ausprägung
            <a href=' . $termLink . '>' . $termName . '
            </a> wurde zur Dimension
            <a href=' . $taxLink . '>' . $termDimension . '
            </a> hinzugefügt
        </h2>
        <p>' . $CuttedTermDes . '</p>
    </div>
';

    return $dynamic_content;
}