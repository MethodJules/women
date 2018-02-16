(function ($, Drupal) {

    Drupal.behaviors.map_filters = {
        attach: function (context, settings) {

            var heatConfig = {
                // the minimum opacity the heat will start at
                minOpacity: 0.7,
                // zoom level where the points reach maximum intensity (as intensity scales with zoom), equals maxZoom of the map by default
                maxZoom: 0.0,
                // maximum point intensity, 1.0 by default
                max: 5.0,
                // radius of each "point" of the heatmap, 25 by default
                radius: 30,
                // amount of blur, 15 by default
                blur: 20,
                // color gradient config, e.g. {0.4: 'blue', 0.65: 'lime', 1: 'red'}
                //gradient: {0.0: 'navy', 0.25: 'blue', 0.5: 'green', 0.75: 'yellow', 1: 'red'}
            };

            var heat = null;

            heat = L.heatLayer(Drupal.settings.map_filters.heatData, heatConfig);

            // Drupal.settings variables get merged instead of overwritten after AJAX calls (e.g. after using the views
            // filters to update the map). To get a correctly filtered heatmap layer the heatData is deleted from
            // Drupal settings after used.
            Drupal.settings.map_filters.heatData = [];

            var lMap = Drupal.settings.leaflet[0].lMap;
            var layerControl = null;
            //lMap.addLayer(heat);
            //$('.leaflet-marker-pane, .leaflet-shadow-pane').hide();

            if ($('.leaflet-control-layers-overlays').length === 0) {
                layerControl = L.control.layers({}, {'Heatmap' : heat}).addTo(lMap);
            }

            lMap.on('overlayadd', function(overlay) {
                if(overlay.name === 'Heatmap') {
                    $('.leaflet-marker-pane, .leaflet-shadow-pane').hide();
                }
            });

            lMap.on('overlayremove', function(overlay) {
                if(overlay.name === 'Heatmap') {
                    $('.leaflet-marker-pane, .leaflet-shadow-pane').show();

                }
            });

            // Add overlay of connecting lines between projects and partners
            var polylineConfig = {
                //If false, the layer will not emit mouse events and will act as a part of the underlying map.
                interactive: false,
                // How much to simplify the polyline on each zoom level. More means better performance and smoother look, and less means more accurate representation.
                smoothFactor: 1.0,
                // Disable polyline clipping.
                noClip: false,
                // Whether to draw stroke along the path. Set it to false to disable borders on polygons or circles.
                stroke: true,
                // Stroke color
                color: '#3388ff',
                // Stroke width in pixels
                weight: 3,
                // Stroke opacity
                opacity: 0.8,
                // A string that defines shape to be used at the end of the stroke.
                lineCap: 'round',
                // A string that defines shape to be used at the corners of the stroke.
                lineJoin: 'round',
                dashArray: null,
                dashOffset: null,

            };

            var polylinesData = settings.map_filters.polylinesData;
            if (polylinesData && layerControl) {
                multiPolyline = L.multiPolyline(settings.map_filters.polylinesData, polylineConfig);
                Drupal.settings.map_filters.polylinesData = [];
                layerControl.addOverlay(multiPolyline, 'Verbindungen'); // TODO generalize
            } else {
                $(".leaflet-control-layers-overlays span:contains('Verbindungen')").parent().hide();
            }

        }
    };
})(jQuery, Drupal);
