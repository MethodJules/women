<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 01.02.17
 * Time: 11:36
 */

require_once 'indekonews_newsletter_sceleton.inc';

/**
 * Diese Funktion baut einen Newsletter für den angemeldeten User und stellt ihn auf die Homepage. Diese Funktion
 * soll nur zu Entwicklungszwecken dienen.
 * @return den zusammengestellten Newsletter
 */

function indekonews_get_newsletter_preview() {
    global $user;
    $heute = date("d.m.y");

    $newsletter_counter = 'InDeKo-News Vorschau-Edition';

    $sql = "SELECT * FROM {newsletter_order} AS orders WHERE orders.uid =" . $user->uid;
    $user_pass = db_query($sql);

    foreach($user_pass as $u) {
        $pw = $u->user_pw;
    }

    $activities = indekonews_getAllPersonalActivities($user);
    $mail = indekonews_buildMail($pw,$heute,$newsletter_counter,$user, $activities, true);
    return $mail;
}