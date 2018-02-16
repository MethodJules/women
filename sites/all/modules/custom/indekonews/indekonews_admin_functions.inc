<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 01.02.17
 * Time: 12:04
 */

function indekonews_erstellenForm($form, &$form_submit) {
    $form['fill_user'] = array(
        '#type' => 'submit',
        '#value' => 'User-Tabelle befüllen',
        '#submit' => array('indekonews_fill_newsletter_order_table')

    );

    $form['fill_user_settings'] = array(
        '#type' => 'submit',
        '#value' => 'User-Settings befüllen',
        '#submit' => array('indekonews_fill_newsletter_settings_table')

    );
    return $form;
}

function indekonews_fill_newsletter_order_table() {
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
    drupal_set_message("User-Daten wurden zur 'newsletter_order'-Tabelle hinzugefügt");
}

function indekonews_fill_newsletter_settings_table() {
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
    drupal_set_message("User-Daten wurden zur 'newsletter_settings'-Tabelle hinzugefügt");
}