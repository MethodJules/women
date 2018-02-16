INTRODUCTION
------------

Provides a block that displays one of multiple possible images. The image is swapped for another image
after a configurable interval of hours passed.


REQUIREMENTS
------------

This module requires the following modules:

 * Block (core module)
 * Date (https://www.drupal.org/project/date)


INSTALLATION
------------

This module can be installed like any other Drupal module:
 1. Place it in the custom modules directory for your site (e.g. sites/all/modules/custom).
 2. Enable it on the 'admin/modules' page.
 3. Configure the image swap block (e.g. admin/structure/block/manage/imageswapblock/imageswapblock/configure)
 4. Assign the image swap block to a visible region on your site (admin/structure/block)


CONFIGURATION
-------------

 * Configure the time interval in hours. Every x hours another image will be displayed. The configuration menu shows the
 time until the next swap.

 * Configure the image directory that contains the images that will be swapped.
 public:// maps to your Drupal public file system path (e.g. sites/default/files). Create the imageswapblock folder
 with images there or the path.

 After saving the block configuration the found images will be listed the next time you enter the image swap block
 configuration menu. After adding or removing images from the configured directory you have to enter the image swap
 block configuration again and save it to update the images.