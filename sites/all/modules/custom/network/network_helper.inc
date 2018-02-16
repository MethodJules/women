<?php
/**
 * Created by PhpStorm.
 * User: hofer
 * Date: 04.02.2017
 * Time: 19:01
 */

//Returns shortest path from start- to endnode via other nodes (if path length over 1) and path length. E.g. A,B,C,3
function findShortestPath($graph, $origin, $destination)
{
    //mark all nodes as unvisited
    foreach ($graph as $vertex => $neighbor) {
        $visited[$vertex] = false;
    }
    //create an empty queue
    $queue = new SplQueue();
    //queue the origin vertex and mark as visited
    $queue->enqueue($origin);
    $visited[$origin] = true;
    //this is used to track the path back from each node
    $path = array();
    $path[$origin] = new SplDoublyLinkedList();
    $path[$origin]->setIteratorMode(SplDoublyLinkedList::IT_MODE_FIFO | SplDoublyLinkedList::IT_MODE_KEEP);

    $path[$origin]->push($origin);
    //while queue is not empty and destination not found

    while (!$queue->isEmpty() && $queue->bottom() != $destination) {
        $t = $queue->dequeue();
        if (!empty($graph[$t])) {
            foreach ($graph[$t] as $vertex) {
                if (!$visited[$vertex]) {
                    $queue->enqueue($vertex);
                    $visited[$vertex] = true;

                    $path[$vertex] = clone $path[$t];
                    $path[$vertex]->push($vertex);
                }
            }
        }
    }
    if (isset($path[$destination])) {
        $out="";
        foreach ($path[$destination] as $vertex) {
            $out .= $vertex.",";
        }
        $out .= count($path[$destination]) - 1;
        return($out);
    }
}

function network_transpose($network_matrix) {
    $result = [];
    $keys   = array_keys($network_matrix);
    foreach($network_matrix[$keys[0]] as $index => $temp) {
        $data = [];
        foreach($keys as $i => $key) {
            $data[$key] = $network_matrix[$key][$index];
        }
        $result[] = $data;
    }

    //dsm($result);

    return $result;
}