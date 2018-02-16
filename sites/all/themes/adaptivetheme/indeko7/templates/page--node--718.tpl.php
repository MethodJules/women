<?php
/**
 * @file
 * Adaptivetheme implementation to display a node.
 *
 * Adaptivetheme variables:
 * AT Core sets special time and date variables for use in templates:
 * - $submitted: Submission information created from $name and $date during
 *   adaptivetheme_preprocess_node(), uses the $publication_date variable.
 * - $datetime: datetime stamp formatted correctly to ISO8601.
 * - $publication_date: publication date, formatted with time element and
 *   pubdate attribute.
 * - $datetime_updated: datetime stamp formatted correctly to ISO8601.
 * - $last_update: last updated date/time, formatted with time element and
 *   pubdate attribute.
 * - $custom_date_and_time: date time string used in $last_update.
 * - $header_attributes: attributes such as classes to apply to the header element.
 * - $footer_attributes: attributes such as classes to apply to the footer element.
 * - $links_attributes: attributes such as classes to apply to the nav element.
 * - $is_mobile: Mixed, requires the Mobile Detect or Browscap module to return
 *   TRUE for mobile.  Note that tablets are also considered mobile devices.
 *   Returns NULL if the feature could not be detected.
 * - $is_tablet: Mixed, requires the Mobile Detect to return TRUE for tablets.
 *   Returns NULL if the feature could not be detected.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct url of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type, i.e., "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type, i.e. story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode, e.g. 'full', 'teaser'...
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined, e.g. $node->body becomes $body. When needing to access
 * a field's raw values, developers/themers are strongly encouraged to use these
 * variables. Otherwise they will have to explicitly specify the desired field
 * language, e.g. $node->body['en'], thus overriding any language negotiation
 * rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 * @see adaptivetheme_preprocess_node()
 * @see adaptivetheme_process_node()
 */

/**
 * Hide Content and Print it Separately
 *
 * Use the hide() function to hide fields and other content, you can render it
 * later using the render() function. Install the Devel module and use
 * <?php dsm($content); ?> to find variable names to hide() or render().
 */
hide($content['comments']);
hide($content['links']);
?>
<?php
drupal_add_css(drupal_get_path('theme', 'indeko7') . "/css_network/bootstrap.min.css");
drupal_add_js(drupal_get_path('theme', 'indeko7') . "js_network/js/mainscript.js");
drupal_add_js(drupal_get_path('theme', 'indeko7') . "js_network/js/d3.v2.min.js");

?>
<style>
  body { padding:50px 0px 0px 0px; z-index:0;}
  h1 {color: #2da046; font-weight:bold; font-size: 28px;}
  h2 {color: #2da046; font-weight:bold; font-size: 20px; }
  h3 {color: #2da046; font-weight:bold; font-size: 16px;}
  hr { border:1px solid #2da046}

  a{color:#2da046;text-decoration:none}
  a:focus,a:hover{color:#2da046; text-decoration:underline}

  img {
    margin:0px;
    padding:0px;
    vertical-align: top;
  }

  .row-header{
    margin:0px auto;
    padding:0px auto;
  }

  .row-content {
    margin:0px auto;
  }


  .navbar-inverse {
    background: #e7e7e7;
  }


  .navbar-inverse .navbar-nav > .active > a,
  .navbar-inverse .navbar-nav > .active > a:hover,
  .navbar-inverse .navbar-nav > .active > a:focus {
    color: #c8c8c8;
    background: #444;
  }

  .navbar-inverse .navbar-nav .open .dropdown-menu> li> a,
  .navbar-inverse .navbar-nav .open .dropdown-menu {
    background: #e7e7e7;
  }

  .navbar-inverse .navbar-nav .open .dropdown-menu> li> a:hover {
    color: #FFF;
    background: #444;
  }

  .well {margin-top: 20px; padding-top: 5px;}

  .form-required {color: red; }
  .btn-primary {color:#fff;background-color:#2da046; border-color:#083511; width: 100%}
  .btn-primary:hover {color:#fff;background-color:#5aaf6c;border-color:#083511;width: 100%}
  .btn-primary:focus {color:#fff;background-color:#2da046; border-color:#083511; width: 100%}
  .btn-primary:active {color:#fff;background-color:#2da046; border-color:#083511; width: 100%}
  .btn-primary.active.focus,.btn-primary.active:focus,.btn-primary.active:hover,.btn-primary:active.focus,.btn-primary:active:focus,.btn-primary:active:hover,.open>.dropdown-toggle.btn-primary.focus,.open>.dropdown-toggle.btn-primary:focus,.open>.dropdown-toggle.btn-primary:hover{color:#fff;background-color:##2da046;border-color:#122b40}

  .legende {padding-top: 10px; }

  .sidebar-nav {
    list-style: none;
  }

  .sidebar-nav li {
    text-indent: -30px;
  }

  .sidebar-nav li a {
    text-decoration: none;
  }

  .sidebar-nav li a:hover {
    text-decoration: underline; cursor: pointer;
  }

  .sidebar-nav li a:active,
  .sidebar-nav li a:focus {
    text-decoration: none;
  }

  #infobox  {padding-top: 20px; padding-bottom: 10px;}
  #vis {padding-top: 50px; padding-bottom: 78px;}

</style>

<div id="container" class="container">
  <div class="row row-content">
    <div class="col-md-9">
      <h1>Netzwerkanalyse</h1>
      <h2>Das Netzwerk der Förderschwerpunktprojekte</h2>
      <div id="einleitung">
        <p>Auf dieser Seite werden einige der Ergebnisse der Online-Befragung, die das Projekt InDeKo.Navi unter den Projektbeteiligten der am  Förderschwerpunkt "Betriebliches Kompetenzmanagement im demografischen Wandel" beteiligten Projekte im vierten Quartal 2015 durchgeführt hat, als interaktive Netzwerkvisualisierungen präsentiert. Die dargestellten Ergebnisse sind als Momentaufnahme der Begebenheiten zum Zeitpunkt der Datenerhebung zu interpretieren.</p>
        <p>Die Daten, die auf Personenebene erhoben wurden, wurden auf die Projekteebene aggregiert, so dass aus den dargestellten Visualisierungen keine Rückschlüsse auf das Antwortverhalten einzelner Befragter  gezogen werden können. Außerdem ist zu berücksichtigen, dass aufgrund der Beteiligungsquote an der Befragung  von ca. 43% über einige Projekte keine oder nur wenige Daten vorliegen und die Visualisierungen deshalb an verschiedenen Stellen fehlende Relationen und unbekannte Attributierungen enthalten. </p>
        <p>Dennoch wird durch die Visualisierung der Relationen zwischen den Projekten des Förderschwerpunkts in Kombination mit verschiedenen Aspekten des betrieblichen Kompetenzmanagement im demografischen Wandel eine Perspektive aufgetan, die zur Exploration einlädt. Dem Betrachter wird ermöglicht, die Struktur der Verbindungen im Förderschwerpunkt zu überblicken und gemeinsame Aspekte der verschiedenen Projekte in Augenschein zu nehmen. So können bestehende und auch fehlende Verbindungen zwischen Projekten, die sich mit ähnlichen Aspekten beschäftigen, eingeschätzt werden und mögliche zukünftige Synergieeffekte und Kooperationsmöglichkeiten ausgelotet werden.</p>
        <h3>Interaktive Netzwerkvisualisierung</h3>
        <p>Über die Einstellungsmöglichkeiten auf der rechten Seite können verschiedene Netzwerkvisualisierungen  zusammengestellt werden. Hierfür lassen sich vier Relationsarten auswählen, die aus den Antworten auf verschiedene Fragen des Onlinefragebogens errechnet wurden. Zur Auswahl stehen die Relationsarten „Bekanntheit“, „Interesse“, „Austausch besteht“ und „Austausch erwünscht“. Näheres hierzu wird weiter unten im Abschnitt „Relationsarten“ erläutert. Außerdem lassen sich drei Aspekte, unter denen die Projekte betrachtet werden, auswählen. Diese sind „Fokusgruppen“, „Demografischer Aspekt“ und „Zielgruppe“. Näheres hierzu wird weiter unten im Abschnitt „Aspekte“ erläutert.</p>
        <p>Die Projekte sind in den Visualisierungen als farbige Kreise dargestellt und stellen die Knoten im Netzwerk dar. Die Farben der Kreise geben Aufschluss über die jeweilige Ausprägung des aktuell betrachteten Aspektes. Wird z.B. die Visualisierung der Fokusgruppen ausgewählt, steht ein rot eingefärbter Kreis für ein Projekt aus der Fokusgruppe 1. </p>
        <p>Die Pfeile zwischen den Kreisen bilden die Beziehungen zwischen den Projekten ab und stellen die Kanten im Netzwerk dar. Die Pfeile stehen für gerichtete Beziehungen, die von einem Projekt zu einem anderen Projekt verlaufen. Zeigt ein Pfeil von einem Projekt A zu einem Projekt B, so bedeutet dies, dass mindestens die Hälfte der Befragten Personen aus Projekt A, die die Frage beantwortet haben, den betreffenden Frageaspekt Projekt B gegenüber positiv bescheiden. Wie dies im einzelnen Fall zu interpretieren ist, wird ebenfalls im nachfolgenden Abschnitt „Relationsarten“ erläutert.</p>
        <p>Fährt der Betrachter mit der Maus über einen Knoten in der Netzwerkvisualisierung, so werden dieser Knoten und die an ihn angrenzenden Kanten hervorgehoben. Außerdem werden der Name des Projektes, für das dieser Knoten steht, sowie die zugehörige Fokusgruppe in einem Informationskasten an der rechten Bildschirmseite eingeblendet.</p>
        <p>Die Platzierung der Knoten auf der Projektionsfläche wurde durch einen Algorithmus vorgenommen und stellt eine sinnvolle aber nicht zwingende Anordnung der Projekte im Raum dar.  Klickt der Betrachter auf einen Knoten und hält die linke Maustaste gedrückt, lässt sich der so ausgewählte Knoten in der Visualisierung verschieben. So lassen sich eventuell verdeckte Relationen oder Unklarheiten über einen Kantenverlauf im Netzwerk manuell auflösen.</p>
        <h3>Relationsarten</h3>
        <p><b><u>Bekanntheit</u> der Projektinhalte</b></p>
        <p>In der Erhebung wurden die Befragten zunächst gefragt, in welchem Projekt sie selbst beschäftigt sind. Anschließend wurden Fragen zu allen anderen Projekten gestellt. Zunächst wurde gefragt, ob bekannt ist, mit welchen Inhalten sich das jeweils andere Projekt beschäftigt. Zur Auswahl standen die Auswahlkategorien „Ja, größtenteils“, Ja, teilweise“, Ja, aber nur oberflächlich“ und „Nein“. Für die hier vorgenommene Visualisierung wurden diese Antwortkategorien in „Ja“ (Zusammenfasung der ersten drei  Antwortkategorien) und „Nein“ dichotomisiert. Anschließend wurden die so ermittelten Antworten jeweils über die Gesamtmenge der befragten Personen pro Projekt aggregiert. Haben mindestens die Hälfte der befragten Personen aus Projekt A, die die Frage beantwortet haben, angegeben, dass sie wissen, mit welchen Inhalten sich Projekt B beschäftigt, dann wird die Relation „Bekannt“ als gegeben betrachtet.</p>
        <p>Hat eine befragte Person angegeben, dass ihr ein bestimmtes anderes Projekt im oben beschriebenen Sinn bekannt ist, dann wurde sie näher zu diesem Projekt befragt. Hierzu wurden jeweils drei weitere Fragen gestellt, aus denen drei weiteren Beziehungsrelationen konstruiert wurden, welche im Folgenden beschrieben werden.</p>
        <p><b><u>Interesse:</u> Relevanz für das eigene Projekt</b></p>
        <p>Zunächst wurde gefragt, für wie interessant die Befragten das jeweils andere Projekt für das eigene Projekt halten. Hier standen zur Beantwortung die folgenden Kategorien zur Verfügung: „Sehr Interessant“, „Interessant“, „weniger interessant“ und „nicht interessant“. Auch hier wurden die Antwortkategorien anschließend für den Zweck der Visualisierung dichotomisiert. Hierbei wurden die Kategorien „Sehr Interessant“ und „Interessant“ als vorhandenes Interesse und „wenig interessant“ und „nicht interessant“ als abwesendes Interesse interpretiert. Die Relation „Interesse“ ist also gegeben, wenn mindestens die Hälfte der befragten Personen aus Projekt A, die die Frage beantwortet haben, angegeben, dass sie Projekt B für das eigene Projekt A für sehr interessant oder interessant halten.</p></b>
        <p><b><u>Austausch besteht</u></b></p>
        <p>Sodann wurde gefragt, ob ein Austausch konkreter oder informeller Art zwischen dem eigenen Projekt A und dem jeweils anderen Projekt B besteht. Hier konnten die Befragten zwischen den Antwortmöglichkeiten „Ja“, „Nein“ und „Unbekannt“ auswählen. Die Relation „Austausch besteht“ wird als gegeben angesehen, wenn mindestens die Hälfte der befragten Personen aus Projekt A, die die Frage beantwortet haben, angegeben, dass ihr Projekt mit dem jeweiligen Projekt B im Austausch steht. </p>
        <p><b>(Mehr) <u>Austausch erwünscht</u></b></p>
        <p>Zuletzt wurde gefragt, ob die Befragte sich (mehr) Austausch zu dem jeweils anderen Projekt B wünscht. Hier wurden die Antwortmöglichkeiten „Ja“ und „Nein“ vorgegeben. Aus den gegebenen Antworten wurde die Relation „Austausch erwünscht“ generiert. Die Relation „Mehr Austausch“ wird als gegeben angesehen, wenn mindestens die Hälfte der befragten Personen aus Projekt A, die die Frage beantwortet haben, angegeben, dass sie sich (mehr) Austausch mit dem jeweiligen Projekt B wünschen.</p>
        <p>Alle so erstellten Relationen sind als gerichtete Beziehungen zu betrachten. Es wird also immer die Haltung der Mehrheit der Befragten aus einem Projekt zu einem anderen Projekt abgebildet. Die Richtung der Beziehung wird durch die Richtung des Pfeils in der Abbildung visualisiert. Die Beziehung zwischen zwei Projekten A und B können also vier Ausprägungen annehmen. So kann die Beziehung als von beiden Seiten als vorhanden angesehen werden (Pfeile in beide Richtungen), sie kann von nur einem der beiden Projekte als gegeben betrachtet werden (ein Pfeil in die eine oder in die andere Richtung) oder sie kann von beiden Seiten als nicht vorhanden angesehen werden (keinerlei Pfeile zwischen den Projekten).</p>
        <h3>Aspekte</h3>
        <p>Über  eine zweite Auswahlmöglichkeit auf der rechten Seite der Netzwerkdarstellung lassen sich verschiedene Aspekte auswählen, unter denen die Projekte betrachtet werden können. Die hier dargestellten drei Aspekte werden im Folgenden näher erläutert.</p>
        <p>Wird der Aspekt <b>„Fokusgruppen“</b> ausgewählt, wird in den Netzwerkvisualisierungen durch die Einfärbung der Knoten im Netzwerk die Zugehörigkeit der verschiedenen Projekte zu den verschiedenen Fokusgruppen dargestellt.  Die Aufschlüsselung des Farbschemas in die verschiedenen Fokusgruppen lässt sich der Legende entnehmen. Die Zuordnung der Projekte zu den Fokusgruppen wurde nicht durch die Online-Befragung erhoben sondern der Konzeption des Förderschwerpunktes entnommen.</p>
        <p>Wird der Aspekt <b>„Demografischer Aspekt“</b> ausgewählt, gibt die Einfärbung der Netzwerkknoten darüber Auskunft, ob sich ein Projekt mit einem bestimmten demografischen Aspekt befasst, nicht befasst oder ob über die Beschäftigung mit diesem Aspekt keine Informationen vorliegen. Die Zuordnung eines Projektes zu einer dieser drei Kategorien fußt auf den Ergebnissen der Online-Befragung. Gab mindestens die Hälfte der Befragten Personen aus einem Projekt an, dass sich dieses Projekt mit dem infrage stehenden demografischen Aspekt beschäftigt, so wurde diesem Projekt das Attribut „Trifft zu“ zugeschrieben. Gaben weniger als die Hälfte der Befragten an, dass sich dieses Projekt mit dem infrage stehenden demografischen Aspekt beschäftigt, so wurde diesem Projekt das Attribut „Trifft nicht zu“ zugeschrieben. Gab es keine Rückmeldung aus einem Projekt bezüglich der gestellten Frage, wurde dem Projekt das Attribut „Unbekannt“ zugeschrieben. Über der Aufschlüsselung des Farbschemas befindet sich eine weitere Auswahlfläche, über die sich der jeweils anzuzeigende demografische Aspekt auswählen lässt. Dort stehen die Aspekte „Alters- und Lebensphasen“, „Familienphasen“, „Gender / Geschlecht“, „Migrationshintergrund“,  und „Strukturschwache Regionen“ zur Auswahl.</p>
        <p>Wird der Aspekt <b>„Zielgruppe“</b> ausgewählt, lassen sich über die Auswahlfläche verschiedene Zielgruppen auswählen, die von den verschiedenen Projekten adressiert werden. Zur Auswahl stehen die Zielgruppen „Produzierende Unternehmen“, „Dienstleistungsbereich“, „Verwaltungsbereich“, „Wissenschaftsbereich“ und „Bildungsbereich“. Die Zuordnung der Attribute „Trifft zu“, „Trifft nicht zu“ und „Unbekannt“ folgt derselben Methodik wie oben im Abschnitt „Demografischer Aspekt“ beschrieben.</p>
        <h3>Technischer Hinweis</h3>
        <p>Für die korrekte Darstellung der Netzwerkvisualisierung wird ein moderner, aktueller Webbrowser vorausgesetzt. Der verwendete Browser muss HTML5 und CSS3 korrekt und standardkonform interpretieren. Die Verwendung von Javascript muss im Browser erlaubt sein. Zudem muss der Browser in der Lage sein, Vektorgraphiken selbst zu zeichnen. Für die optimale Darstellung empfehlen wir die Verwendung des aktuellen Firefox-Browsers. Dieser ist für alle gängigen Betriebssysteme kostenlos verfügbar.</p>
      </div>
      <div id="vis" class="hidden">
        <div id="vis1"></div>
        <div id="vis2" class="hidden"></div>
        <div id="vis3" class="hidden"></div>
        <div id="vis4" class="hidden"></div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="well">
        <h2>Inhalt</h2>
        <ul class="sidebar-nav">
          <li><a onclick="modus(1)">Einleitung</a></li>
          <li><a onclick="modus(2)">Netzwerke</a></li>
        </ul>
      </div>
      <div class="well hidden" id="relart">
        <h2>Relationsart</h2>
        <select name="rel" id="rel" size="1" onchange="relation()">
          <option value="1" selected>Bekanntheit</option>
          <option value="2">Interesse</option>
          <option value="3">Austausch besteht</option>
          <option value="4">Austausch erwünscht</option>
        </select>
      </div>
      <div class="well hidden" id="aspart">
        <h2>Aspekte</h2>
        <select name="asp" id="asp" size="1" onchange="aspekt()">
          <option value="1" selected>Fokusgruppen</option>
          <option value="2">Demografischer Aspekt</option>
          <option value="3">Zielgruppe</option>
        </select>
      </div>
      <div class="well hidden" id="details">
        <div id="con1" class="hidden">
          <h2>Fokusgruppen</h2>
          <img src="../sites/all/themes/adaptivetheme/indeko7/js_network/images/legende1.svg" id="legende">
        </div>
        <div id="con2" class="hidden">
          <h2>Demografischer Aspekt</h2>
          <select name="ak" id="ak" size="1" onchange="changeDemAsp()">
            <option value="1" selected>Alters- und Lebensphasen</option>
            <option value="2">Familienphasen</option>
            <option value="3">Gender / Geschlecht</option>
            <option value="4">Migrationshintergrund</option>
            <option value="5">Strukturschwache Regionen</option>
          </select>
          <img class="legende" src="../sites/all/themes/adaptivetheme/indeko7/js_network/images/legende2.svg" id="legende">
        </div>
        <div id="con3" class="hidden">
          <h2>Zielgruppe</h2>
          <select name="zg" id="zg" size="1" onchange="changeZG()">
            <option value="1" selected>Produzierende Unternehmen</option>
            <option value="2">Dienstleistungsbereich</option>
            <option value="7">Verwaltungsbereich</option>
            <option value="3">Wissenschaftsbereich</option>
            <option value="4">Bildungsbereich</option>
          </select>
          <img class="legende" src="../sites/all/themes/adaptivetheme/indeko7/js_network/images/legende2.svg" id="legende">
        </div>
      </div>
      <div class="well hidden" id="infobox"></div>
    </div>
  </div>
</div>