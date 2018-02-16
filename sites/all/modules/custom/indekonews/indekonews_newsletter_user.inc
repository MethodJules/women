<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 01.02.17
 * Time: 13:14
 */

function indekonews_create_user_for_newsletter($activity) {
    $user = user_load($activity->nid);
    $user_content= '
    <div class="user_registration wrap">
        <h2>Der Benutzer '.$user->name.' hat sich registriert
        </h2>
    </div>';

    return $user_content;
}


