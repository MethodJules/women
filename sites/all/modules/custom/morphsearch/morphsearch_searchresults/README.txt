INTRODUCTION
------------

Adds a block view to display Apache Solr search results in a block.
The Block contains an exposed fulltext search field and displays the search results using AJAX in the same block.
The knowledge map module will use this block to display the search results after an area has been clicked.


REQUIREMENTS
------------

This module requires the following modules:
 * Apache Solr Views (https://www.drupal.org/project/apachesolr_views): This module provides a Views integration for Apache Solr.


RECOMMENDED MODULES
-------------------

 * form_wissenskarte_module: This custom module will display search results after clicking a map area .


INSTALLATION
------------

This module can be installed like any other Drupal module:
 1. Place it in the custom modules directory for your site (e.g. sites/all/modules/custom).
 2. Enable it on the 'admin/modules' page.
 3. Assign the 'View: Searchresults' block to a visible region on the 'admin/structure/block' page.


CONFIGURATION
-------------

The module has no menu or modifiable settings. There is no configuration.