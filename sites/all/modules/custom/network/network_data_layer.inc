<?php
/**
 * Created by PhpStorm.
 * User: hofer
 * Date: 25.01.2017
 * Time: 15:14
 */

//Selects all collaborating authors and publications from DB via cross join
//Output format is: publication-id, origin-author-id, destination-author-id, author-names.
function network_create($mode) {

    if($mode=="author") {
        $nodes = db_query("SELECT origin.vid as publicationID, origin.cid as originID, destination.cid as destinationID, origindata.lastname as origin_lastname, origindata.firstname as origin_firstname, destinationdata.lastname as destination_lastname, destinationdata.firstname as destination_firstname FROM biblio_contributor origin CROSS JOIN biblio_contributor destination ON destination.cid > origin.cid AND origin.vid = destination.vid JOIN biblio_contributor_data origindata ON origindata.cid = origin.cid JOIN biblio_contributor_data destinationdata ON destinationdata.cid = destination.cid;");
    } elseif ($mode == "publication") {
        $nodes = db_query("SELECT origin.cid as authorID, origin.vid as originID, destination.vid as destinationID, publicationData_origin.biblio_sort_title as title_origin, publicationData_destination.biblio_sort_title as title_destination FROM biblio_contributor origin CROSS JOIN biblio_contributor destination ON destination.vid > origin.vid AND origin.cid = destination.cid JOIN biblio publicationData_origin ON origin.vid = publicationData_origin.vid JOIN biblio publicationData_destination ON destination.vid = publicationData_destination.vid;");
    }
    $nodes = $nodes->fetchAll();
    $nodes = json_encode($nodes);

    return($nodes);
}