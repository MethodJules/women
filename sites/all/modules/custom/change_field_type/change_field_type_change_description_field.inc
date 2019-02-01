<?php
/**
 * Created by PhpStorm.
 * User: julien
 * Date: 01.02.19
 * Time: 05:19
 */


function change_description_field() {

    //load all nodes from content type sw education
    $nodes = node_load_multiple(array(), array('type' => 'sw_edcuation'));

    dsm($nodes);

    return '<p>Danke</p>';
}