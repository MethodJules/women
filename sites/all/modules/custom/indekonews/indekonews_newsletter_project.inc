<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 01.02.17
 * Time: 13:25
 */

function indekonews_create_project_for_newsletter($activity) {
    $dynamic_content = "";

    //Ermitteln der node ID des Projektes
    $projectNode = node_load($activity->nid);

    //Erzeugen eines internen Links
    $projectNodeURL = url('node/'. $activity->nid);

    $dynamic_content.= "<h2>Projekt <a href=\"$projectNodeURL\">".$projectNode->title. "</a> wurde erstellt</h2>";

    $projectDescription = indekonews_get_description($activity->nid);

    //Wenn die Beschreibung länger als 300 Zeichen ist, wird sie abgeschnitten
    $newProjecttDes = cutNewsDescription($projectDescription);
    $dynamic_content.= "<p>$newProjecttDes<p>";
    $dynamic_content.= "</div>";

    return $dynamic_content;
}