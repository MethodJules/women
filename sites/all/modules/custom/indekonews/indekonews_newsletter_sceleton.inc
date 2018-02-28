<?php
/**
 * Created by PhpStorm.
 * User: jonaskortum
 * Date: 01.02.17
 * Time: 12:07
 */

require_once 'indekonews_newsletter_event.inc';
require_once 'indekonews_newsletter_project.inc';
require_once 'indekonews_newsletter_user.inc';
require_once 'indekonews_newsletter_tax_terms.inc';

/*
 * Diese Funktion setzt den HTML Teil des Newsletters zusammen
 */



function indekonews_buildMail($pw, $heute, $newsletter_counter, $user, $activities, $check) {
    global $base_url;

    //Link zum Abbstellen des Newsletters
    $unsubscribe = $base_url . '/unsubscribe_from_newsletter/' . $user->uid . '/' . $pw;

    $newsletter_html = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.=
w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8">
    <style type="text/css">
        font-family: Fira, Arial, sans-serif;
    </style>
  </head>

    

    
    
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
        <center>
            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color:#dedede;">
                <tr>
                    <td align="center" valign="top" id="bodyCell" style="padding:20px;background:#52b166;">
                        <!-- BEGIN TEMPLATE // -->
                        <table border="0" cellpadding="0" width="600" cellspacing="0" id="templateContainer" style="max-width:600px; box-shadow: 1px 1px 5px #2D5F37; background-color: #fff">
                            <tr>
                                <td align="center" valign="top" id="msowidth">
                                    <table border="0" cellpadding="20" cellspacing="0" width="100%" id="templatePreheader">
                                        <tr>
                                            <td valign="top" class="preheaderContent" style="
									            color: #666666;
											    font-family: Arial;
												font-size: 12px;
												line-height: 125%;
											    text-align: left;
												background: #e7e7e7;"
											    mc:edit="preheader_content00">
                                                Es gibt Neuigkeiten auf x.Navi.de! Hier kommt der aktuelle Newsletter.
                                            </td>
                                            <td valign="top" width="180" class="preheaderContent" style="
										        color:#666666;
											    font-family:Arial;
												font-size:12px;
												line-height:125%;
											    text-align:left;
												background:#e7e7e7;"
											    mc:edit="preheader_content01">
                                                Die Email wird nicht richtig dargestellt?<br /><a style="
												color:#666666;
												font-weight:normal;"
												href="'.$base_url .'/newsletter_preview">Email im Browser darstellen</a>.
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="20" cellspacing="0" width="100%" id="templateHeader">
                                        <tr>
                                            <td valign="top" class="headerContent">
  						                        <h1 style="
  							                        color:#444 !important;
  							                        display:block;
  							                        font-family:Arial;
  							                        font-size:40px;
  							                        font-style:normal;
  							                        font-weight:bold;
  							                        line-height:100%;
  							                        letter-spacing:normal;
  							                        text-align:left;
  							                        vertical-align:middle;"
                                                >NEWS.NAVI</h1>
                                            </td>
                                            <td class="headerContent">
                                                <img src="http://147.172.96.40/sites/default/files/inline-images/logo_indekonavi.jpg"
                                                    width="104" height="104"
                                                    id="headerImage" mc:label="header_image" mc:edit="header_image"/>
                                            </td>
                                        </tr>
  					                    <tr>
                                            <td valign="top" class="edition" style="
                                                color:#444444;
                                                background:#fff;
                                                font-family:Arial;
                                                font-size:12px;
                                                font-weight:normal;
                                                line-height:100%;
                                                text-align:left;
                                                vertical-align:middle;
                                                ">
                                                ' . $newsletter_counter . '
  					                        </td>
                                            <td valign="top" class="date" style="
                                                color:#444444;
                                                background:#fff;
                                                font-family:Arial;
                                                font-size:12px;
                                                font-weight:normal;
                                                line-height:100%;
                                                text-align:left;
                                                vertical-align:middle;">
                                                ' . $heute . '
                                            </td>
  					                    </tr>
                                    </table>
                                </td>
                            </tr>
                          	<tr>
                                <td align="center" valign="top">
                                    <table border="0" cellpadding="20" cellspacing="0" width="100%" id="templateBody ">
                                        <tr>
                                            <td valign="top" class="bodyContent announcement">
                                                <h3 style="
                                                    color:#444444 !important;
                          						        display:block;
                          					            font-family:Arial;
                          							    font-size:14px;
                          								font-style:italic;
                          								font-weight:normal;
                          								line-height:150%;
                          							    letter-spacing:normal;
                          								text-align:left;">
                          								Sehr geehrte Damen und Herren, <br>
                                                        liebe Interessierte des Förderschwerpunkts Betriebliches Kompentenzmanagement
												        im Demografischen Wandel: das neue News.Navi ist da.<br>
                                                        Vermissen Sie wichtige Themen oder haben Sie Anregungen oder Wünsche
												        zur Gestaltung von News.Navi? Dann senden Sie uns eine E-Mail an
												        indeko@uni-hildesheim.de.
												</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top" class="bodyContent" style="
                                                color:#444;
                                                font-family:Arial;
                                                font-size:14px;
                                                line-height:150%;
                                                text-align:left">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="dynamic_content_container">
                                                    <tr id="aktivitaeten_log">
                                                    '.indekonews_create_dynamic_content($activities, $check, $user).'
                                                    </tr>
                                                </table>
      	                                    </td>
                                        </tr>
                                    </table>
      	                        </td>
                            </tr>


                            <!-- // END BODY -->

                            <tr>
                            <td align="center" valign="top">
                                <!-- BEGIN FOOTER // -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter" style="background-color:e7e7e7;">
                                    <tr>
                                        <td valign="top" class="footerContent" align="center" style="
                                            color:#666;
        					                font-family:Arial;
        					                font-size:12px;
        					                line-height:150%;
        					                text-align:left;
        					                background:#e7e7e7;">
                                            <a  href="'.$unsubscribe.'">
          						                <table cellpadding="20" width="100%">
          							                <tr>
          								                <td style="color:#666; font-family:Arial; font-size:12px; text-align:center;">
          									                Newsletter abbestellen
          								                </td>
          							                </tr>
          						                </table>
          					                </a> &nbsp;&nbsp;&nbsp;
                                        </td>
                                        <td width="1" style="background-color:#ccc;">
                                        </td>
                                        <td valign="top" align="center" class="footerContent" style="
                                            color:#666;
                                            font-family:Arial;
        					                font-size:12px;
        					                line-height:150%;
        					                text-align:left;
        					                background:#e7e7e7;">
        					                <a href="*|forward|*">
        						                <table cellpadding="20" width="100%">
        							                <tr>
        								                <td style="color:#666;font-size:12px; font-family: Arial; text-align:center;">
        									                Newsletter weiterleiten
        								                </td>
        							                </tr>
        						                </table>
        					                </a>&nbsp;
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </table>
                    <!-- // END TEMPLATE -->
                    </td>
                </tr>
            </table>
        </center>
    </body>
    </html>';


//Hier beginnt der dynamische Content.
    $content = "";

//Es wird über alle gefundenen Aktivitäten iteriert und der Inhalt eingefügt
    foreach ($activities as $act) {
        $content .= getActivtiyBody($user, $act, $check);
    }

//Zum Schluss werden noch benötigte closing tags hinzugefügt.
    $content .= '



';

    return $newsletter_html;
}

function indekonews_create_dynamic_content($activities, $check, $user) {
    $dynamic_content = "";

    foreach ($activities as $act) {
        switch($act->content_type) {
            case 'event':
                $dynamic_content .= indekonews_create_event_for_newsletter($act, $check, $user);
                break;
            case 'projekt':
                $dynamic_content .= indekonews_create_project_for_newsletter($act);
                break;
            case 'taxonomy':
                $dynamic_content .= indekonews_create_taxonomy_for_newsletter($act);
                break;
            case 'term':
                $dynamic_content .= indekonews_create_term_for_newsletter($act);
                break;
            case 'user':
                $dynamic_content .= indekonews_create_user_for_newsletter($act);
                break;
            default:
                break;
        }
    }


    return $dynamic_content;
}
