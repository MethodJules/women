<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 22.09.16
 * Time: 20:57
 */

function newsletter_generator($form, &$form_submit) {

    $form['instruction'] = array(
        '#markup' => '<p>Bitte wählen Sie aus, welche Art von Informationen Sie in ihrem Newsletter haben wollen:</p>'
    );

    if (indekonews_check_newsletter_order()) {

            if (indekonews_get_newsletter_information("event")) {
                $form['eventCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 1,
                    '#title' => t('Event'),
                );

            } else {
                $form['eventCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 0,
                    '#title' => t('Event'),
                );
            }

            if (indekonews_get_newsletter_information("project")) {
                $form['projectCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 1,
                    '#title' => t('Projekt'),
                );
            } else {
                $form['projectCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 0,
                    '#title' => t('Projekt'),
                );
            }

            if (indekonews_get_newsletter_information("taxonomy")) {
                $form['dimensionCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 1,
                    '#title' => t('dimension'),
                );
            } else {
                $form['dimensionCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 0,
                    '#title' => t('dimension'),
                );
            }

            if (indekonews_get_newsletter_information("term")) {
                $form['taxonomyCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 1,
                    '#title' => t('factor'),
                );
            } else {
                $form['taxonomyCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 0,
                    '#title' => t('factor'),
                );
            }

            /*
            if (indekonews_get_newsletter_information("knowledge_map")) {
                $form['knowledgeMapCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 1,
                    '#title' => t('knowledge map'),
                );
            } else {
                $form['knowledgeMapCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 0,
                    '#title' => t('knowledge map'),
                );
            }

            if (indekonews_get_newsletter_information("publication")) {
                $form['publicationCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 1,
                    '#title' => t('publication'),
                );
            else {
                $form['publicationCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 0,
                    '#title' => t('publication'),
            }
            */
            if (indekonews_get_newsletter_information("user_registration")) {
                $form['registrationCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 1,
                    '#title' => t('user registration'),
                );
            } else {
                $form['registrationCheckBox'] = array(
                    '#type' => 'checkbox',
                    '#default_value' => 0,
                    '#title' => t('user registration'),
                );
            }

        $form['name'] = array(
            '#type' => 'fieldset',
            '#description' => "Achtung: Nur, wenn der Newsletter abbestellt wird, werden keine Emails mehr versendet."
        );

        $form['name']['sign'] = array(
            '#type' => 'submit',
            '#value' => 'Newsletter abbstellen',
            '#submit' => array('indekonews_go_to_sign_off')
        );


        $form['submit'] = array(
            '#type' => 'submit',
            '#value' => 'Einstellungen speichern',
            '#submit' => array('indekonews_save_newsletter_settings')
        );
        return $form;

} else {

        global $base_url;
        $url = $base_url ."/sign_on_newsletter";

        drupal_set_message("Sie können die Einstellungen für den Newsletter nicht editieren, da Sie sich nicht für
    den Newsletter angemeldet haben.<br><a href=$url>Hier anmelden</a> ", "error");

            $form['eventCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 0,
                '#disabled' => TRUE,
                '#title' => t('Event'),
            );

            $form['projectCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 0,
                '#disabled' => TRUE,
                '#title' => t('Projekt'),
            );

            $form['dimensionCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 0,
                '#disabled' => TRUE,
                '#title' => t('dimension'),
            );

            $form['taxonomyCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 0,
                '#disabled' => TRUE,
                '#title' => t('factor'),
            );

        /*
        if (indekonews_get_newsletter_information("knowledge_map")) {
            $form['knowledgeMapCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 1,
                '#title' => t('knowledge map'),
            );
        } else {
            $form['knowledgeMapCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 0,
                '#title' => t('knowledge map'),
            );
        }

        if (indekonews_get_newsletter_information("publication")) {
            $form['publicationCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 1,
                '#title' => t('publication'),
            );
        else {
            $form['publicationCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 0,
                '#title' => t('publication'),
        }
        */

            $form['registrationCheckBox'] = array(
                '#type' => 'checkbox',
                '#default_value' => 0,
                '#disabled' => TRUE,
                '#title' => t('user registration'),
            );

        $form['submit'] = array(
            '#type' => 'submit',
            '#value' => 'Einstellungen speichern',
            '#disabled' => TRUE,
            '#submit' => array('indekonews_save_newsletter_settings')
        );
        return $form;




}
}

function indekonews_go_to_sign_off() {
    global $user;
    $userID = $user->uid;

    //Es wird gecheckt, ob der Benutzer schon vorher angemeldet war:
    $check = db_query("SELECT * FROM {newsletter_order} as news WHERE news.uid = :uid AND news.subscribed = 1",
        array(":uid" => $userID,));

    if ($check->rowCount()) {
        db_query("UPDATE {newsletter_order} SET subscribed = 0 WHERE uid = :uid",
            array(":uid" => $userID));

        db_query("DELETE FROM {newsletter_settings} WHERE uid = :uid",
            array(":uid" => $userID));

        //drupal_goto("/newsletter_generator");
        drupal_set_message("Sie wurden vom Newsletter abgemeldet");

    } else {

    }
}

/*
 * In dieser Funktion werden die Einstellungen des Users bzgl. des Newsletters in den Checkboxen aufgenommen und in
 * die Datenbank abgespeichert
 */
function indekonews_save_newsletter_settings($form, &$form_state) {

    global $user;
    $event = $form_state['values']['eventCheckBox'];
    $project = $form_state['values']['projectCheckBox'];
    $publication = 1;
    $user_reg = $form_state['values']['registrationCheckBox'];
    $map = 1;
    $term = $form_state['values']['taxonomyCheckBox'];
    $taxonomy = $form_state['values']['dimensionCheckBox'];

    db_query("UPDATE {newsletter_settings} SET event = :event, project = :project, publication = :publication, user_registration = :user_reg, knowledge_map = :map, term = :term, taxonomy = :taxonomy WHERE uid = :uid",
        array(":event" => $event,
            ":project" => $project,
            ":uid" => $user->uid,
            ":publication" => $publication,
            ":user_reg" => $user_reg,
            ":map" => $map,
            ":term" => $term,
            ":taxonomy" => $taxonomy));

    drupal_set_message("Änderungen wurden gespeichert!");
}

/*
 * Diese Funktion holt sich die aktuellen Einstellungen des Users bzgl. des Newsletters aus der Datenbank und gibt
 * diese zurück
 */
function indekonews_get_newsletter_information($information_type) {

    global $user;
    $check = 0;

    $type = db_query("SELECT * FROM {newsletter_settings} AS settings WHERE settings.uid = :uid",
        array(":uid" => $user->uid));

    if ($type->rowCount()) {
        foreach ($type as $t) {
            if (strcmp($information_type, "event") == 0) {
                if ($t->event) {
                    $check = 1;
                }
            } else if (strcmp($information_type, "project") == 0) {
                if ($t->project) {
                    $check = 1;
                }
            } else if (strcmp($information_type, "taxonomy") == 0) {
                if ($t->taxonomy) {
                    $check = 1;
                }
            } else if (strcmp($information_type, "term") == 0) {
                if ($t->term) {
                    $check = 1;
                }
            } else if (strcmp($information_type, "knowledge_map") == 0) {
                if ($t->knowledge_map) {
                    $check = 1;
                }
            } else if (strcmp($information_type, "user_registration") == 0) {
                if ($t->user_registration) {
                    $check = 1;
                }
            }
        }
    }

    return $check;
}

function indekonews_check_newsletter_order() {
    global $user;
    $type = db_query("SELECT * FROM {newsletter_settings} AS settings WHERE settings.uid = :uid",
        array(":uid" => $user->uid));
    if ($type->rowCount()) {
        return TRUE;
    } else {
        return FALSE;
    }
}