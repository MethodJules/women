<?php
/**
 * Created by PhpStorm.
 * User: kortum
 * Date: 20.04.2016
 */


/*
 * Diese Funktion ermittelt die Beschreibung anhand der Node ID
 */
function indekonews_get_description($nid) {

    //Der Node wird ermittelt
    $node2 = node_load($nid);

    //Wenn der Node ein Event ist
    if(!strcmp($node2->type, "event")) {

        $description = "";
        $result = db_query("SELECT * FROM {node} as node INNER JOIN {field_data_field_news_mehr} AS mehr ON node.nid = mehr.entity_id WHERE node.nid = :nid;",
            array(":nid" => $nid));

        foreach($result as $r) {
            $description = $r->field_news_mehr_value;
        }

        //Falls keine Beschreibung vorhanden ist, soll ein Standardtext erzeugt werden.
        if (!strcmp($description, "")) {
            $description = "Keine Beschreibung vorhanden";
        }

    //Wenn der Node ein Projekt ist
    } else if(!strcmp($node2->type, "projekt")) {
        $result = db_query("SELECT * FROM {field_data_body} as body WHERE body.entity_id = :nid;",
            array(":nid" => $nid));

        foreach($result as $r) {
            $description = $r->body_value;
        }

        //Falls keine Beschreibung vorhanden ist, soll ein Standardtext erzeugt werden.
        if(!strcmp($description, "")) {
            $description = "Keine Beschreibung vorhanden";
        }
    }

    return $description;
}

/*
 * Diese Funktion analysiert die Länge einer Beschreibung und schneidet diese bei Bedarf nach einer gewissen Anzahl
 * Zeichen ab.
 */
function cutNewsDescription($string) {

    if(strlen($string) > 300) {
        $new = substr($string,0,300);
        $leerzeichen = " ";
        $pos = strripos($new, $leerzeichen);
        $newDes = substr($new,0,$pos);
        $newDes .=" ...";
        return $newDes;
    } else {
        return $string;
    }
}

function check_Interest($uid, $eventID) {
    $check = db_query("SELECT * FROM {interestedgroups} as groups WHERE groups.userID = :uid AND groups.eventID = :eventID AND groups.interested = 1",
        array(":uid" => $uid, ":eventID" => $eventID));

    if($check->rowCount()) {
        return true;
    } else {
        return false;
    }
}

function check_Participation($uid, $eventID) {
    $check = db_query("SELECT * FROM {interestedgroups} as groups WHERE groups.userID = :uid AND groups.eventID = :eventID AND groups.accept = 1",
        array(":uid" => $uid, ":eventID" => $eventID));

    if($check->rowCount()) {
        return true;
    } else {
        return false;
    }
}

/*
 * NUR FÜR EINMALIGES BENUTZEN!
 */
function insertUsersForNewsletter() {
    $result = db_query("SELECT * FROM {users}");

    foreach ($result as $r) {
        $check = db_query("SELECT * FROM {newsletter_order} as news WHERE news.uid = :uid;",
        array(":uid" => $r->uid));

        if($check->rowCount()) {
        } else {

            $id = db_query("SELECT MAX(newsletter_order_id) FROM newsletter_order")->fetchCol();
            $id[0]++;

            $pass = generateRandomString(40);

            db_query("INSERT INTO {newsletter_order} VALUES (:newsletter_order_id,:uid,:subscribed, :pass)",
                array("newsletter_order_id" => $id[0], ":uid" => $r->uid, ":subscribed" => 1, ":pass" => $pass));
        }
    }
}

function insertUserSettingsForNewsletter() {
    $result = db_query("SELECT * FROM {users}");
    foreach ($result as $r) {
        $check = db_query("SELECT * FROM {newsletter_settings} as settings WHERE settings.uid = :uid;",
        array(":uid" => $r->uid));
        if($check->rowCount()) {

        } else {
            $id = db_query("SELECT MAX(newsletter_settings_id) FROM newsletter_settings")->fetchCol();
            $id[0]++;

            db_query("INSERT INTO {newsletter_settings} VALUES (:newsletter_settings_id,:uid,1,1,1,1,1,1,1)",
                array("newsletter_settings_id" => $id[0], ":uid" => $r->uid));
        }
    }
}

function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
