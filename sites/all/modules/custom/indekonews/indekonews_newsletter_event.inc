<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 01.02.17
 * Time: 13:14
 */

function indekonews_create_event_for_newsletter($activity, $check, $user)
{
    $event_content = "";

    //Content wird gestylt und Titel und Beschreibung werden angezeigt
    $event_content .= '
	<tr id="main_content">
        <td colspan="5">
  		    <h2 id="content_heading" style="
                color:#444444 !important;
                display:block;
                font-family: Fira, Arial, sans-serif;
                font-size:20px;
                font-style:normal;
                font-weight:bold;
                line-height:100%;
                letter-spacing:normal;
                text-align:left;">
  			    ' . indekonews_getActivityName($activity) . ' findet am ' . indekonews_getActivityDate($activity) . ' statt.
  		    </h2>
            <p style="font-family: Fira, Arial, sans-serif;">' . cutNewsDescription(indekonews_get_description($activity->nid)) . '</p>
        </td>
    </tr>
    <tr class="spacer" height="20">
    </tr>';


    if ($check) {
        //Die passenden Buttons werden gesucht und anschließend angezeigt
        $choice = indekonews_getButtonChoice($user, $activity);
        switch ($choice) {
            case 1:
                $event_content .= '<tr class="row_button">';
                $event_content .= indekonews_getButtonContent($user, $activity, 4);
                $event_content .= '</tr> <tr><td colspan="3" height="80"></td></tr>';
                break;
            case 2:
                $event_content .= '<tr class="row_button">';
                $event_content .= indekonews_getButtonContent($user, $activity, 2);
                $event_content .= indekonews_getButtonContent($user, $activity, 3);
                $event_content .= '</tr> <tr><td colspan="3" height="80"></td></tr>';
                break;
            case 3:
                $event_content .= '<tr class="row_button">';
                $event_content .= indekonews_getButtonContent($user, $activity, 1);
                $event_content .= indekonews_getButtonContent($user, $activity, 3);
                $event_content .= '</tr> <tr><td colspan="3" height="80"></td></tr>';
                break;
        }
    }

    return $event_content;
}

/*
 * Diese Funktion gibt entsprechende Buttons für die Darstellung von Events zurück.
 */
function indekonews_getButtonContent($user, $act, $choice)
{
    global $base_url;
    $pw = "";
    $sql = "SELECT * FROM {newsletter_order} AS orders WHERE orders.uid =" . $user->uid;
    $user_pass = db_query($sql);

    foreach ($user_pass as $u) {
        $pw = $u->user_pw;
    }

    $interest = $base_url . '/event_interest_newsletter/' . $act->nid . '/' . $user->uid . '/' . $pw;
    $participation = $base_url . '/event_participation_newsletter/' . $act->nid . '/' . $user->uid . '/' . $pw;
    $no_interest = $base_url . '/event_no_interest_newsletter/' . $act->nid . '/' . $user->uid . '/' . $pw;
    $no_participation = $base_url . '/event_no_participation_newsletter/' . $act->nid . '/' . $user->uid . '/' . $pw;


    //Button für die Interesse an einem Event
    $interest = '
    <td align="center" width="40%" style="background-color: #52b166; box-shadow: 0px 1px 4px rgba(0,0,0,.2);">
        <a href=' . $interest . ' style="text-decoration:none;">
            <table width="100%" cellpadding="10">
                <tr>
                    <td
                        style="
                        font-family: Fira, Arial, sans-serif;
                        text-align: center;
                        color: #fff;
                        text-decoration: none;
                        font-size: 12px;
                        letter-spacing:.5px;
                        text-transform: uppercase;">
                        Ich bin interessiert
                    </td>
                </tr>
            </table>
        </a>
    </td>
    <td width="20">
    </td>'; //Platzhalter zwischen den Buttons

    //Button für die Desinteresse an einem Event
    $noInterest = '
    <td align="center" width="40%" style="background-color: #444; box-shadow: 0px 1px 4px rgba(0,0,0,.2);">
        <a href=' . $no_interest . ' style="text-decoration:none;">
            <table width="100%" cellpadding="10">
                <tr>
                    <td
                        style="
                        font-family: Fira, Arial, sans-serif;
                        text-align: center;
                        color: #fff;
                        text-decoration: none;
                        font-size: 12px;
                        letter-spacing:.5px;
                        text-transform: uppercase;">
                        Ich bin nicht interessiert
                    </td>
                </tr>
            </table>
        </a>
    </td>
    <td width="20">
    </td>'; //Platzhalter zwischen den Buttons

    //Button für die Zusage zu einem Event
    $participation = '
    <td align="center" width="40%" style="background-color: #52b166; box-shadow: 0px 1px 4px rgba(0,0,0,.2);">
        <a href=' . $participation . ' style="text-decoration:none;">
            <table width="100%" cellpadding="10">
                <tr>
                    <td
                        style="
                        font-family: Fira, Arial, sans-serif;
                        text-align: center;
                        color: #fff;
                        text-decoration: none;
                        font-size: 12px;
                        letter-spacing:.5px;
                        text-transform: uppercase;">
                        Ich nehme teil
                    </td>
                </tr>
            </table>
        </a>
    <td>';

    //Button für die Absage an einem Event
    $noParticipation = '
    <td align="center" width="40%" style="background-color: #444; box-shadow: 0px 1px 4px rgba(0,0,0,.2);">
        <a href=' . $no_participation . ' style="text-decoration:none;">
            <table width="100%" cellpadding="10">
                <tr>
                    <td
                        style="
                        font-family: Fira, Arial, sans-serif;
                        text-align: center;
                        color: #fff;
                        text-decoration: none;
                        font-size: 12px;
                        letter-spacing:.5px;
                        text-transform: uppercase;">
                        Ich nehme nicht mehr teil
                    </td>
                </tr>
            </table>
        </a>
    </td>';

    //Anschließend wird anhand des Übergabeparameters geschaut, welcher der Buttons zurückgegeben werden soll.
    switch ($choice) {
        case 1:
            return $interest;
            break;
        case 2:
            return $noInterest;
            break;
        case 3:
            return $participation;
            break;
        case 4:
            return $noParticipation;
            break;
    }
}


//Diese Funktion bekommt ein Activity-Objekt und gibt den dazu passenden Titel zurück.
function indekonews_getActivityName($activity)
{
    $eventNode = node_load($activity->nid);
    return $eventNode->title;
}

function indekonews_getActivityDate($activity)
{
    $date = "";
    $result = db_query("SELECT * FROM {field_data_field_date} AS date WHERE date.entity_id = :id;",
        array(":id" => $activity->nid));

    if ($result->rowCount()) {
        foreach ($result as $r) {
            $date = $r->field_date_value;
            $date = date("d.m.Y", strtotime($date));
        }
    }
    return $date;
}

//Diese Funktion ermittelt, welche Buttons bei Events angezeigt werden sollen.
function indekonews_getButtonChoice($user, $activity)
{
    if (check_Participation($user->uid, $activity->nid)) {
        return 1;
    } else {
        if (check_Interest($user->uid, $activity->nid)) {
            return 2;
        } else {
            return 3;
        }
    }
}