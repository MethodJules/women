<?php
/**
 * Created by PhpStorm.
 * User: hofer
 * Date: 25.01.2017
 * Time: 14:38
 */

function network_setup($mode){

    module_load_include('inc', 'network', 'network_helper');
    //Specify "author" for nodes=authors / "publication" for nodes=publications
    $nodes = network_create($mode);

    //Needs ID of node to calculate key-figures for and output of network_create()
    //$figures = calculateNodeFigures("118", json_encode($nodes));
    //dsm($figures);
    //**************************************
    //dsm($nodes['nodes'][0]['name']);
    return network_draw($nodes);
//**************************************
}

function network_create($mode) {

    if($mode=="author") {
        $nodes = db_query("SELECT origin.vid as publicationID, origin.cid as originID, destination.cid as destinationID, origindata.lastname as origin_lastname, origindata.firstname as origin_firstname, destinationdata.lastname as destination_lastname, destinationdata.firstname as destination_firstname FROM biblio_contributor origin CROSS JOIN biblio_contributor destination ON destination.cid > origin.cid AND origin.vid = destination.vid JOIN biblio_contributor_data origindata ON origindata.cid = origin.cid JOIN biblio_contributor_data destinationdata ON destinationdata.cid = destination.cid;");
    } elseif ($mode == "publication") {
        $nodes = db_query("SELECT origin.cid as authorID, origin.vid as originID, destination.vid as destinationID, publicationData_origin.biblio_sort_title as title_origin, publicationData_destination.biblio_sort_title as title_destination FROM biblio_contributor origin CROSS JOIN biblio_contributor destination ON destination.vid > origin.vid AND origin.cid = destination.cid JOIN biblio publicationData_origin ON origin.vid = publicationData_origin.vid JOIN biblio publicationData_destination ON destination.vid = publicationData_destination.vid;");
    }
    //dsm($mode);
    $nodes = $nodes->fetchAll();
    //dsm($nodes);

    $table = create_calc_table($nodes);
    //print $table;

    $data = array_merge(network_get_nodes($nodes), network_get_edges($nodes));
    //dsm($data['nodes'][0]['name']);
    $nodes = $data;

    return($nodes);
}

function create_calc_table($nodes) {
    $net_calculations = array();
    foreach ($nodes as $node) {
        array_push($net_calculations,(calculateNodeFigures($node->originID, json_encode($nodes))));
    }
    $header = array(
        'network-size' => t('Network-Size'),
        'network-density' => t('Network-Density'),
        'node-id' => t('Node-ID'),
        'lastname' => t('lastname'),
        'degree-centrality' => t('Degree-Centrality'),
        'closeness-centrality' => t('Closeness-Centrality'),
        'betweeness-centrality' => t('Betweeness-Centrality'),
    );
    return theme('table',array('header'=>$header, 'rows'=> $net_calculations));
}


function network_draw($data) {
    $chart = array(
      'id' => 'visualization',
        'type' => 'biblio_network',
        'data' => $data,
    );

    return d3_draw($chart);
}


function network_get_nodes($nodes) {
    $network_nodes = network_get_all_nodes($nodes);
    $nodes = array();
    foreach ($network_nodes as $node) {
        $network_node = array(
            'name' => $node,
        );
        array_push($nodes, $network_node);
    }


    $network_nodes = array(
      'nodes' => $nodes,
    );
    return $network_nodes;
}

function network_get_edges($nodes) {
    $network_nodes = network_get_nodes($nodes);
    $network_edges = array();
    foreach ($nodes as $node) {
        //dsm("Kante zwischen " . $node->originID . " und " . $node->destinationID );
        $network_edge = array(
            //'source' => intval($node->originID),
            //'target' => intval($node->destinationID),
            'source' => intval(network_search_index($network_nodes['nodes'], $node->originID)),
            'target' => intval(network_search_index($network_nodes['nodes'], $node->destinationID)),
        );
        array_push($network_edges, $network_edge);

    }
    $network_edges = array(
        'edges' => $network_edges,
    );
    return $network_edges;
}


function network_get_all_nodes($nodes){
    $origin_ids = network_get_all_origin_ids($nodes);
    $destination_ids = network_get_all_destination_ids($nodes);
    $all_nodes = array_merge($origin_ids, $destination_ids);
    //dsm($all_nodes);
    $all_nodes = array_unique($all_nodes);



    return $all_nodes;
}


function network_get_all_origin_ids($nodes) {
    $origin_ids = array();
    foreach ($nodes as $node_data) {
        array_push($origin_ids, $node_data->originID);
    }

    return $origin_ids;
}


function network_get_all_destination_ids($nodes) {
    $destinations_ids = array();
    foreach ($nodes as $node_data) {
        array_push($destinations_ids, $node_data->destinationID);
    }
    return $destinations_ids;
}

function network_search_index($network_nodes, $search_value) {

    for($i=0; $i<count($network_nodes);$i++) {
        //dsm($network_nodes[$i]['name']);
        if($network_nodes[$i]['name'] == $search_value) {
            break;
        }

    };
    return $i;
}

//Calculates central network figures (size and density) and key-figures of a node by given Node-ID. Call with JSON-object from network_create() and Node-ID to calculate figures for.
//Degree-, closeness- and betweenness-centrality are returned non-normalized!
function calculateNodeFigures($nodeID, $in) {

    $in = json_decode($in,true);
    //dsm($in);
    $nodes = array_merge(array_column($in, 'originID'),array_column($in, 'destinationID'));
    $nodesUnique = array_unique($nodes);

    $networkSize = count(array_unique($nodes));
    $networkDensity = count($in) / ($networkSize * ($networkSize-1) / 2);

    $degreeCentrality = count(array_keys($nodes, $nodeID));
    $closenessCentrality = 0;
    $betweennessCentrality = 0;
    $separator = ",";

    $graph  = array();
    foreach ($in as $edgeData) {
        //dsm($edgeData[1]);
        $graph[$edgeData["originID"]][$edgeData["destinationID"]]=$edgeData["destinationID"];
        $graph[$edgeData["destinationID"]][$edgeData["originID"]]=$edgeData["originID"];
    }


    foreach ($nodesUnique as $origin) {
        $closenessTemp = findShortestPath($graph, $nodeID, $origin);
        $closenessTemp = explode($separator, $closenessTemp);
        //Sum all shortest paths from node to all other nodes
        $closenessCentrality += end($closenessTemp);
        //If node has more than one adjacent nodes, calculate betweenness centrality
        if($degreeCentrality > 1) {
            foreach ($nodesUnique as $destination) {
                //Calculate path-lenghts for all routes, except start to start node or if desired node is on an end of a graph/route
                if($origin < $destination && $nodeID != $origin && $nodeID != $destination) {
                    $betweennessTemp = findShortestPath($graph, $origin, $destination);
                    //filter out paths with two nodes or less (no betweenness) or not containing desired node
                    if( in_array($nodeID, explode($separator, $betweennessTemp))  && substr_count($betweennessTemp, $separator) > 2) {
                        $betweennessCentrality++;
                    }
                }
            }
        }
    }

    //$out = '[{"network-size":"'.$networkSize.'","network-density":"'.$networkDensity.'"},{"node-id":"'.$nodeID.'","degree-centrality":"'.$degreeCentrality.'","closeness-centrality":"'.$closenessCentrality.'","betweenness-centrality":"'.$betweennessCentrality.'"}]';

    $out = array(
        'network-size' => $networkSize,
        'network-density' => $networkDensity,
        'node-id' => $nodeID,
        'lastname' => get_origin_lastname($nodeID),
        'degree-centrality' => $degreeCentrality,
        'closeness-centrality' => $closenessCentrality,
        'betweeness-centrality' => $betweennessCentrality,
    );

    //dsm($in);
    get_origin_lastname($nodeID);
    return($out);
}


function get_origin_lastname($nodeId) {
    $resulset = db_query('SELECT origindata.lastname as origin_lastname, origindata.firstname as origin_firstname FROM biblio_contributor origin CROSS JOIN biblio_contributor destination ON destination.cid > origin.cid AND origin.vid = destination.vid JOIN biblio_contributor_data origindata ON origindata.cid = origin.cid JOIN biblio_contributor_data destinationdata ON destinationdata.cid = destination.cid
WHERE origin.cid = :node_id;', array(':node_id' => $nodeId));

    $result = $resulset->fetchAll();
    //dsm($result[0]->origin_lastname);
    return $result[0]->origin_lastname;
}






