<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 01.02.17
 * Time: 11:01
 */


/*
 * Funktion wird aufgerufen, wenn sich der Nutzer vom Newsletter abmelden möchte.
 */
function indekonews_conversion_unsubscribe_from_newsletter()
{
    $userID = arg(1);
    $pw = arg(2);

    $validationCheck = false;

    $sql = "SELECT * FROM {newsletter_order} as news WHERE news.uid = " . $userID;
    $result = db_query($sql);

    foreach ($result as $r) {
        if (!strcmp($r->user_pw, $pw) && $r->uid == $userID) {
            $validationCheck = true;
        }
    }

    if ($validationCheck) {
        //Zuerst wird gecheckt, ob der Nutzer überhaupt angemeldet war.
        $check = db_query("SELECT * FROM {newsletter_order} as news WHERE news.uid = :uid AND news.subscribed = 1",
            array(":uid" => $userID,));

        //Wenn er anmeldet war, wird er in der DB-Tabelle abgemeldet
        if ($check->rowCount()) {
            db_query("UPDATE {newsletter_order} SET subscribed = 0 WHERE uid = :userID",
                array(":userID" => $userID));
            db_query("DELETE FROM {newsletter_settings} WHERE uid = :userID",
                array(":userID" => $userID));
            return "Vielen Dank. Ab sofort sind sie nicht mehr für den Newsletter angemeldet";

            //Falls er nicht angemeldet war...
        } else {
            return "Es ist ein Fehler aufgetreten. Offenbar waren sie vorher nicht für den Newsletter angemeldet.<br>
        Bitte wenden Sie sich an den Administrator.";
        }
    } else {
        return "Es ist ein Fehler aufgetreten. Bitte nutzen Sie den Abbestellen-Link in Ihrem Newsletter.
        Sollten weiterhin Fehler auftreten,<br>wenden Sie sich bitte an den Administrator!";

    }
}

function indekonews_conversion_sign_on_from_website() {

    global $user;
    $userID = $user->uid;

    //Es wird gecheckt, ob der Benutzer schon vorher angemeldet war:
    $check = db_query("SELECT * FROM {newsletter_order} as news WHERE news.uid = :uid AND news.subscribed = 0",
        array(":uid" => $userID,));
    if ($check->rowCount()) {

        db_query("UPDATE {newsletter_order} SET subscribed = 1 WHERE uid = :uid",
            array(":uid" => $userID));

        $id = db_query("SELECT MAX(newsletter_settings_id) FROM newsletter_settings")->fetchCol();
        $id[0]++;

        //Der Benutzer wird zu den Einstellungen hinzugefügt:
        db_query("INSERT INTO {newsletter_settings} VALUES (:id,:uid, 1,1,1,1,1,1,1)",
            array(":id" => $id[0], ":uid" => $userID));

        drupal_set_message("Sie wurden erfolgreich für den InDeKo-Newsletter angemeldet!");
        drupal_goto("newsletter_generator");
    } else {
        drupal_set_message("Sie sind bereits für den InDeKo-Newsletter angemeldet!");
        drupal_goto("newsletter_generator");
    }
}

