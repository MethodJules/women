/**
 * Created by hofer on 12.12.2016.
 */
/**
 * @file
 * Javascript for [library name].
 */

(function($) {

    /**
     * Adds library to the global d3 object.
     *
     * @param select
     * @param settings
     *   Array of values passed to d3_draw.
     *   id: required. This will be needed to attach your
     *       visualization to the DOM.
     */
    Drupal.d3.kompetenz_words = function (select, settings) {
        // Your custom JS.

        var w = 800;
        var h = 1200;
        var linkDistance=200;
        div = (settings.id) ? settings.id : 'visualization';

        var dataset = { nodes: [{name:"www.iai-bochum.de"},{name:"kompetenzentwicklung"},{name:"www.champnet.de"},{name:"kompetenzvernetzung"},{name:"netzwerkkompetenzen"},{name:"www.in-k-ha.de"},{name:"www.openorganisation.de"},{name:"www.arkoh.de"},{name:"www.plug-and-learn.org"},{name:"transdemo-projekt.de"},{name:"kompetenzmanagment"},{name:"kernkompetenzen"},{name:"www.transdemo-projekt.de"},{name:"www.4c4learn.de"},{name:"kompetenzorientiertes"},{name:"www.alfaclu.net"},{name:"kompetenzbedarfe"},{name:"kompetenzbündel"},{name:"www.brofessio.uni-bremen.de"},{name:"www.alfa-agrar.de"},{name:"www.strakosphere.de"},{name:"kompetenznetzwerk"},{name:"www.pm-kompare.de"},{name:"innovationskompetenzen"},{name:"umsetzungskompetenz"},{name:"kompetenzbedingte"},{name:"kompetenzentwicklungs"},{name:"kompetenzdefiziten"},{name:"kompetenzdiagnose"},{name:"kompetenzmodellierung"},{name:"innovationskompetenz"},{name:"www.erziehungswissenschaft.uni-wuppertal.de"},{name:"technikkompetenz"},{name:"systemkompetenz"},{name:"www.abeko.lfo.tu-dortmund.de"},{name:"kompetenzmodell"},{name:"kompetenzmodelle"},{name:"kompetenzmodulen"},{name:"kernkompetenzenansatz"},{name:"kompetenzzentrum"},{name:"akip-projekt.de"},{name:"kompetenzaktivierung"},{name:"kompetenzmanagements"},{name:"www.prokom-4-0.de"},{name:"schlüsselkompetenzen"},{name:"kompetenzträgern"},{name:"kompetenzanforderungen"},{name:"kompetenzverfügbarkeit"},{name:"kompetenzdefizite"},{name:"kompetenzquellen"},{name:"improjects.uni-koblenz.de"},{name:"reputationskompetenz"},{name:"www.handelkompetent.de"},{name:"www.engage-projekt.de"},{name:"gesundheitskompetenzen"},{name:"kompetenzaustausch"},{name:"kompetenzerwerb"},{name:"kompetenzträger"},{name:"kompetenzverlust"},{name:"sprachkompetenz"},{name:"kompetenzmessung"},{name:"kompetenzprofilen"},{name:"kompetenzerweiterung"},{name:"kompetenzfelder"},{name:"kompetenzentwicklungsmaßnahmen"},{name:"kompetenzlücken"},{name:"europakompetenz"},{name:"handlungskompetenz"},{name:"fachkompetenz"},{name:"kompetenzinitiative"},{name:"kompetenzbegriff"},{name:"www.bepeso.de"},{name:"kompetenzpaten"},{name:"kompetenzregion"},{name:"kompetenzfeld"},{name:"www.resilire.de"},{name:"kompetenznutzung"},{name:"www.facharztplus.info"},{name:"kompetenzkontinuität"},{name:"kompetenzarten"},{name:"netzwerkkompetenz"},{name:"kompetenznetzwerkes"},{name:"kompetenzentwicklungskonzept"},{name:"engpasskompetenzen"},{name:"projekt-staysmart.de"},{name:"kompetenzbeschreibung"},{name:"sundheitskompetenz"},{name:"gestaltungskompetenzen"},{name:"gestaltungskompetenz"},{name:"kompetenzprofil"},{name:"kompetenzsicherung"},{name:"kompetenzorientierten"},{name:"umsetzungskompetenzen"},{name:"www.pikoma.info"},{name:"kompetenzprofile"},{name:"kompetenznetzwerks"},{name:"kompetenzmanagementplattform"},{name:"kompetenzmanagementsystem"},{name:"kompetenzaufbau"},{name:"kompetenzentwicklungsprogramms"},{name:"kompetenzelemente"},{name:"kompetenzentwicklungspolitik"},{name:"kompetenzrelevanten"},{name:"kompetenzentwicklungsprozess"},{name:"kernkompetenzansatz"},{name:"kompetenzbestände"},{name:"kompetenzbereiche"},{name:"kompetenzbasierte"},{name:"kompetenzengpässen"},{name:"ausgangskompetenz"},{name:"kompetenzwicklung"},{name:"kompetenzstrukturen"},{name:"inkompetenz"},{name:"kompetenzengpässe"},{name:"koordinationskompetenz"},{name:"kompetenzmanagementassistenzsystem"},{name:"kompetenzmanagementassistenzsystems"},{name:"kompetenzprofiles"},{name:"gesundheitskompetenz"},{name:"kompetenzbedarfen"},{name:"kompetenzvermittlungsmethoden"},{name:"kompetenzvermittlung"},{name:"kompetenzbilanzierung"},{name:"kompetenzentwicklungskonzepten"},{name:"kompetenzmodells"},{name:"kompetenzerfassung"},{name:"kompetenzzentren"},{name:"www.lernen-durch-arbeit.de"},{name:"kompetenzentwicklungsdiskurs"},{name:"kompetenzförderung"},{name:"erholungskompetenzen"},{name:"beziehungskompetenz"},{name:"kompetenzmaßnahmen"},{name:"kompetenzfeststellung"},{name:"kompetenznut"},{name:"medienkompetenz"},{name:"kompetenzeinschätzungen"},{name:"kompetenzmatrix"},{name:"kompetenzbeurteilung"},{name:"kompetenzentwicklungsbedarf"},{name:"kompetenzpotenzialen"},{name:"tungskompetenz"},{name:"fachkompetenzen"},{name:"kompetenzbasierten"},{name:"kompetenzbasierter"},{name:"digitalisierungskompetenz"},{name:"kompetenzanalyse"},{name:"organisationskompetenzen"},{name:"kompetenzmanagementansatz"},{name:"kompetenzlandschaft"},{name:"kompetenzlandkarte"},{name:"prozesskompetenz"},{name:"kompetenzgenerierung"},{name:"kompetenztransfers"},{name:"vernetzungskompetenzen"},{name:"kompetenzmanagementkonzepts"},{name:"kompetenzmodule"},{name:"kompetenzdienstleistungen"},{name:"kompetenznetzwerke"},{name:"kompetenzanalysen"},{name:"kompetenzmanagementmodell"},{name:"kompetenzmanagementsysteme"},{name:"kompetenzentwicklungsbegleiter"},{name:"kompetenzentwicklungsbegleitung"},{name:"kompetenzentwickler"},{name:"kompetenzentwicklungsbedarfe"},{name:"kompetenznetzwerken"},{name:"kompetenzorientierung"},{name:"erziehungskompetenz"},{name:"textüberarbeitungskompetenz"},{name:"auftrittskompetenz"},{name:"selbstkompetenz"},{name:"sprachkompetenzen"},{name:"kompetenzforschung"},{name:"kompetenzentwicklungsprozesse"},{name:"kompetenzentwicklungsprogramme"},{name:"kompetenzbedarf"},{name:"kernkompetenz"},{name:"produktionskompetenzen"},{name:"kompetenzfeldern"},{name:"kompetenzmanage"},{name:"kompetenzstrukturmodell"},{name:"sozialkompetenzen"},{name:"kompetenzdiagnostik"},{name:"kompetenzentwicklungsangeboten"},{name:"forschungskompetenz"},{name:"kompetenzbedarfsanalyse"},{name:"kompetenzbereichen"},{name:"integrationskompetenzen"},{name:"kompetenzmessmodell"},{name:"kompetenzerfassungsinstrument"},{name:"handlungskompetenzen"},{name:"kompetenzerfassungsinstruments"},{name:"gesundheitskompetenzregion"}],edges: [{source: 0, target: 1},{source: 2, target: 3},{source: 2, target: 4},{source: 5, target: 1},{source: 6, target: 1},{source: 7, target: 1},{source: 8, target: 1},{source: 9, target: 10},{source: 0, target: 11},{source: 12, target: 10},{source: 13, target: 14},{source: 15, target: 16},{source: 2, target: 17},{source: 18, target: 1},{source: 19, target: 1},{source: 20, target: 1},{source: 9, target: 21},{source: 22, target: 1},{source: 8, target: 21},{source: 2, target: 23},{source: 0, target: 24},{source: 0, target: 25},{source: 0, target: 26},{source: 0, target: 27},{source: 12, target: 21},{source: 5, target: 28},{source: 15, target: 29},{source: 0, target: 30},{source: 31, target: 32},{source: 0, target: 33},{source: 34, target: 35},{source: 13, target: 36},{source: 8, target: 37},{source: 0, target: 38},{source: 0, target: 39},{source: 12, target: 1},{source: 12, target: 39},{source: 9, target: 39},{source: 40, target: 41},{source: 7, target: 16},{source: 7, target: 42},{source: 43, target: 1},{source: 31, target: 1},{source: 2, target: 44},{source: 2, target: 45},{source: 5, target: 36},{source: 8, target: 46},{source: 0, target: 47},{source: 0, target: 48},{source: 0, target: 49},{source: 50, target: 51},{source: 34, target: 1},{source: 52, target: 1},{source: 9, target: 1},{source: 53, target: 54},{source: 15, target: 55},{source: 15, target: 56},{source: 6, target: 57},{source: 6, target: 58},{source: 31, target: 59},{source: 0, target: 60},{source: 0, target: 61},{source: 20, target: 42},{source: 2, target: 62},{source: 9, target: 63},{source: 40, target: 1},{source: 5, target: 64},{source: 5, target: 65},{source: 5, target: 42},{source: 19, target: 42},{source: 13, target: 42},{source: 13, target: 16},{source: 13, target: 1},{source: 31, target: 66},{source: 0, target: 67},{source: 0, target: 68},{source: 0, target: 69},{source: 0, target: 70},{source: 71, target: 1},{source: 34, target: 46},{source: 52, target: 72},{source: 12, target: 63},{source: 9, target: 73},{source: 9, target: 74},{source: 75, target: 1},{source: 5, target: 76},{source: 77, target: 78},{source: 15, target: 79},{source: 15, target: 80},{source: 8, target: 81},{source: 0, target: 82},{source: 2, target: 57},{source: 2, target: 83},{source: 84, target: 60},{source: 84, target: 1},{source: 12, target: 73},{source: 12, target: 74},{source: 18, target: 42},{source: 22, target: 85},{source: 53, target: 86},{source: 40, target: 87},{source: 5, target: 88},{source: 5, target: 89},{source: 19, target: 90},{source: 13, target: 91},{source: 13, target: 35},{source: 15, target: 42},{source: 15, target: 92},{source: 15, target: 90},{source: 93, target: 1},{source: 43, target: 46},{source: 8, target: 94},{source: 8, target: 95},{source: 6, target: 96},{source: 6, target: 97},{source: 6, target: 70},{source: 31, target: 98},{source: 0, target: 42},{source: 0, target: 99},{source: 0, target: 100},{source: 0, target: 101},{source: 0, target: 102},{source: 0, target: 103},{source: 0, target: 104},{source: 0, target: 105},{source: 0, target: 106},{source: 0, target: 107},{source: 0, target: 108},{source: 0, target: 98},{source: 0, target: 109},{source: 0, target: 110},{source: 0, target: 111},{source: 0, target: 112},{source: 0, target: 113},{source: 0, target: 94},{source: 0, target: 114},{source: 20, target: 57},{source: 50, target: 76},{source: 34, target: 65},{source: 34, target: 29},{source: 34, target: 16},{source: 34, target: 115},{source: 34, target: 116},{source: 2, target: 11},{source: 52, target: 117},{source: 52, target: 42},{source: 52, target: 118},{source: 18, target: 16},{source: 18, target: 119},{source: 18, target: 120},{source: 18, target: 121},{source: 18, target: 3},{source: 18, target: 98},{source: 75, target: 88},{source: 22, target: 42},{source: 22, target: 122},{source: 22, target: 123},{source: 22, target: 124},{source: 22, target: 39},{source: 22, target: 125},{source: 22, target: 126},{source: 127, target: 128},{source: 127, target: 30},{source: 127, target: 46},{source: 53, target: 129},{source: 53, target: 88},{source: 53, target: 130},{source: 53, target: 46},{source: 40, target: 131},{source: 40, target: 26},{source: 40, target: 61},{source: 40, target: 46},{source: 40, target: 76},{source: 5, target: 132},{source: 5, target: 133},{source: 5, target: 134},{source: 5, target: 135},{source: 5, target: 35},{source: 5, target: 136},{source: 5, target: 137},{source: 5, target: 138},{source: 5, target: 139},{source: 5, target: 140},{source: 5, target: 68},{source: 5, target: 141},{source: 5, target: 142},{source: 19, target: 11},{source: 77, target: 143},{source: 77, target: 107},{source: 77, target: 1},{source: 77, target: 42},{source: 77, target: 144},{source: 77, target: 145},{source: 13, target: 146},{source: 13, target: 147},{source: 13, target: 148},{source: 13, target: 149},{source: 13, target: 97},{source: 13, target: 150},{source: 13, target: 90},{source: 13, target: 39},{source: 13, target: 56},{source: 7, target: 119},{source: 7, target: 67},{source: 7, target: 151},{source: 15, target: 152},{source: 15, target: 76},{source: 15, target: 153},{source: 15, target: 1},{source: 15, target: 154},{source: 15, target: 39},{source: 93, target: 42},{source: 93, target: 142},{source: 93, target: 56},{source: 43, target: 21},{source: 43, target: 155},{source: 43, target: 94},{source: 43, target: 16},{source: 43, target: 42},{source: 8, target: 42},{source: 8, target: 156},{source: 8, target: 157},{source: 8, target: 158},{source: 6, target: 46},{source: 6, target: 159},{source: 6, target: 42},{source: 6, target: 160},{source: 6, target: 161},{source: 31, target: 162},{source: 31, target: 163},{source: 31, target: 164},{source: 31, target: 165},{source: 31, target: 166},{source: 31, target: 167},{source: 31, target: 168},{source: 31, target: 169},{source: 31, target: 170},{source: 31, target: 171},{source: 31, target: 67},{source: 31, target: 172},{source: 31, target: 89},{source: 0, target: 161},{source: 0, target: 35},{source: 0, target: 173},{source: 0, target: 174},{source: 0, target: 175},{source: 0, target: 87},{source: 20, target: 46},{source: 20, target: 176},{source: 20, target: 28},{source: 20, target: 16},{source: 20, target: 159},{source: 20, target: 161},{source: 20, target: 165},{source: 20, target: 177},{source: 20, target: 178},{source: 20, target: 179},{source: 71, target: 35},{source: 71, target: 180},{source: 50, target: 126},{source: 34, target: 42},{source: 34, target: 181},{source: 34, target: 182},{source: 34, target: 183},{source: 34, target: 184},{source: 34, target: 173},{source: 34, target: 185},{source: 34, target: 179},{source: 34, target: 186},{source: 2, target: 187},{source: 2, target: 188},{source: 2, target: 177},{source: 84, target: 14},{source: 84, target: 189},{source: 84, target: 42},{source: 84, target: 120},{source: 84, target: 121},{source: 52, target: 3},{source: 52, target: 125},{source: 52, target: 190},{source: 52, target: 191},{source: 52, target: 94},{source: 52, target: 61},{source: 52, target: 89},{source: 52, target: 192},{source: 12, target: 193},{source: 9, target: 193}]};var praedikate = ["266","53","42","39","36","27","25","22","21","21","16","16","16","15","14","14","14","13","13","13","12","12","12","12","12","11","10","10","9","9","9","8","8","8","8","8","8","8","7","7","7","7","7","7","7","6","6","6","6","6","6","6","6","6","5","5","5","5","5","5","5","5","5","5","5","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","3","3","3","3","3","3","3","3","3","3","3","3","3","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","2","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1"];
        var colors = d3.scale.category10();


        var svg = d3.select('#' + div).append("svg").attr({"width":w,"height":h})
            .call(d3.behavior.zoom().on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            }))
            .append("g");

        var force = d3.layout.force()
            .nodes(dataset.nodes)
            .links(dataset.edges)
            .size([w,h])
            .linkDistance([linkDistance])
            .charge([-500])
            .theta(0.1)
            .gravity(0.05)
            .start();



        var edges = svg.selectAll("line")
            .data(dataset.edges)
            .enter()
            .append("line")
            .attr("id",function(d,i) {return 'edge'+i})
            .attr('marker-end','url(#arrowhead)')
            .style("stroke","#ccc")
            .style("pointer-events", "none");

        var nodes = svg.selectAll("circle")
            .data(dataset.nodes)
            .enter()
            .append("circle")
            .attr({"r":15})
            .style("fill",function(d,i){return colors(i);})
            //.style("fill", "green")
            .call(force.drag)
            .on('dblclick', connectedNodes);

        var nodelabels = svg.selectAll(".nodelabel")
            .data(dataset.nodes)
            .enter()
            .append("text")
            .attr({"x":function(d){return d.x;},
                "y":function(d){return d.y;},
                "class":"nodelabel",
                'font-size':12,
                "stroke":"black"})
            .text(function(d){return d.name;});

        var edgepaths = svg.selectAll(".edgepath")
            .data(dataset.edges)
            .enter()
            .append('path')
            .attr({'d': function(d) {return 'M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y},
                'class':'edgepath',
                'fill-opacity':0,
                'stroke-opacity':0,
                'fill':'blue',
                'stroke':'red',
                'id':function(d,i) {return 'edgepath'+i}})
            .style("pointer-events", "none");

        var edgelabels = svg.selectAll(".edgelabel")
            .data(dataset.edges)
            .enter()
            .append('text')
            .style("pointer-events", "none")
            .attr({'class':'edgelabel',
                'id':function(d,i){return 'edgelabel'+i},
                'dx':80,
                'dy':0,
                'font-size':10,
                'fill':'#aaa'});

        edgelabels.append('textPath')
            .attr('xlink:href',function(d,i) {return '#edgepath'+i})
            .style("pointer-events", "none")
            .text(function(d,i){return praedikate[i]});

        svg.append('defs').append('marker')
            .attr({'id':'arrowhead',
                'viewBox':'-0 -5 10 10',
                'refX':25,
                'refY':0,
                //'markerUnits':'strokeWidth',
                'orient':'auto',
                'markerWidth':10,
                'markerHeight':10,
                'xoverflow':'visible'})
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#ccc')
            .attr('stroke','#ccc');


        force.on("tick", function(){

            edges.attr({"x1": function(d){return d.source.x;},
                "y1": function(d){return d.source.y;},
                "x2": function(d){return d.target.x;},
                "y2": function(d){return d.target.y;}
            });

            nodes.attr({"cx":function(d){return d.x;},
                "cy":function(d){return d.y;}
            });

            nodelabels.attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; });

            edgepaths.attr('d', function(d) { var path='M '+d.source.x+' '+d.source.y+' L '+ d.target.x +' '+d.target.y;
                //console.log(d)
                return path});

            edgelabels.attr('transform',function(d,i){
                if (d.target.x<d.source.x){
                    bbox = this.getBBox();
                    rx = bbox.x+bbox.width/2;
                    ry = bbox.y+bbox.height/2;
                    return 'rotate(180 '+rx+' '+ry+')';
                }
                else {
                    return 'rotate(0)';
                }
            });

            //nodes.each(collide(0.5));
        });
        //------------------------------------------------------------
        //Toggle stores whether the highlighting is on
        var toggle = 0;
        //Create an array logging what is connected to what
        var linkedByIndex = {};
        for (i = 0; i < dataset.nodes.length; i++) {
            linkedByIndex[i + "," + i] = 1;
        };
        dataset.edges.forEach(function (d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });
        //This function looks up whether a pair are neighbours
        function neighboring(a, b) {
            return linkedByIndex[a.index + "," + b.index];
        }
        function connectedNodes() {
            if (toggle == 0) {
                //Reduce the opacity of all but the neighbouring nodes
                d = d3.select(this).node().__data__;
                nodes.style("opacity", function (o) {
                    return neighboring(d, o) | neighboring(o, d) ? 1 : 0.05;
                });
                edges.style("opacity", function (o) {
                    return d.index == o.source.index | d.index == o.target.index ? 1 : 0.1;
                });
                //Reduce the op
                toggle = 1;
            } else {
                //Put them back to opacity=1
                nodes.style("opacity", 1);
                edges.style("opacity", 1);
                toggle = 0;
            }
        }

        //-------Collision Detection
        var padding = 1, // separation between circles
            radius=8;
        function collide(alpha) {
            var quadtree = d3.geom.quadtree(graph.nodes);
            return function(d) {
                var rb = 2*radius + padding,
                    nx1 = d.x - rb,
                    nx2 = d.x + rb,
                    ny1 = d.y - rb,
                    ny2 = d.y + rb;
                quadtree.visit(function(quad, x1, y1, x2, y2) {
                    if (quad.point && (quad.point !== d)) {
                        var x = d.x - quad.point.x,
                            y = d.y - quad.point.y,
                            l = Math.sqrt(x * x + y * y);
                        if (l < rb) {
                            l = (l - rb) / l * alpha;
                            d.x -= x *= l;
                            d.y -= y *= l;
                            quad.point.x += x;
                            quad.point.y += y;
                        }
                    }
                    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                });
            };
        }


    }

})(jQuery);
