var relationsart = 1;
var aspekte = 1;
var demografischerAspekt = 1;
var zielgruppe = 1;
var netz1, netz2,netz3,netz4;
var width = 816;
var height = 612;
var farben1 = ["","#FF0000","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF","#FFFFFF"]
var farben2 = function(farbcode) {	 
	  switch (farbcode) {
		  case 0: return "#ff0000";
		  case 1: return "#00ff00";
		  case 9: return "#FFFFFF";
	  }
  } 


Network1 = function() {
  var allData, dragmove, force, hideDetails, link, linkedByIndex, linksG, mapNodes, neighboring1, neighboring2, neighboring3, network, node, nodesG, node_drag, setupData, showDetails, text, textG, tick, updateLinks, updateNodes, updateText;
  allData = [];
  linkedByIndex = {};
  force = d3.layout.force();
  
  network = function(selection, data) {
    var vis;  
    allData = setupData(data);
    vis = d3.select(selection).append("svg").attr("width", width).attr("height", height);
    vis.append("defs").selectAll("marker")
    .data(["normal"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("opacity", "0.8");
    vis.append("defs").selectAll("marker")
    .data(["high"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#555")
    .style("opacity", "1.0");
     vis.append("defs").selectAll("marker")
    .data(["low"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("opacity", "0.5");
    linksG = vis.append("g").attr("id", "links");
    nodesG = vis.append("g").attr("id", "nodes"); 
    textG = vis.append("g").attr("id", "text");        
    node_drag = d3.behavior.drag().on("drag", dragmove);
    updateNodes(); 
    updateLinks();  
    updateText();      
    return;  
  };
  
   setupData = function(data) {
    var nodesMap;   
    data.nodes.forEach(function(n) {    
      n.x = n.x * width;
      n.y = n.y * height;
      return n.radius = 10;
    });
    nodesMap = mapNodes(data.nodes);
    data.links.forEach(function(l) {
      l.source = nodesMap.get(l.source);
      l.target = nodesMap.get(l.target);
      return linkedByIndex[l.source.id + "," + l.target.id] = 1;
    });
    return data;
  };
   
  updateNodes = function() {	 
    node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
      return d.id;
    });
    node.enter().append("circle").attr("class", "node").attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    }).attr("r", function(d) {
      return d.radius;
    }).style("fill", function(d) {		
		 return farben1[d.fg];	
    }).style("stroke", "#555")
    .style("stroke-width", 1.0); 
    node.on("mouseover", showDetails).on("mouseout", hideDetails).call(node_drag);
    return node.exit().remove();
  };
  
  updateLinks = function() {
    link = linksG.selectAll("line.link").data(allData.links, function(d) {
      return d.source.id + "_" + d.target.id;
    });
    link.enter().append("line").attr("class", "link").attr("stroke", "#aaa").attr("stroke-opacity", 0.8).attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    }).style("marker-end",  "url(#normal)");
    return link.exit().remove();
  };  
  
  updateText = function() {
    text = textG.selectAll("text.text").data(allData.nodes, function(d) {
      return d.id;
    });
    text.enter().append("text").text(function(d) {
		return d.name;
	}).attr("class", "text")
	.attr("x", function(d) {
      return d.x + 12;
    }).attr("y", function(d) {
      return d.y;
    }).attr("r", function(d) {
      return d.radius;
    }).attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "black"); 
    return text.exit().remove();
  };
  
    dragmove =  function (d, i) {	
	    if ((d3.event.dx < 0) && !((d.x + d3.event.dx) < 15 )) d.x += d3.event.dx;
	    if ((d3.event.dx > 0) && !((d.x + d3.event.dx) > (width - 15) )) d.x += d3.event.dx;	   
	    if ((d3.event.dy < 0) && !((d.y + d3.event.dy) < 15 )) d.y += d3.event.dy;
        if ((d3.event.dy > 0) && !((d.y + d3.event.dy) > (height - 15) )) d.y += d3.event.dy; 
        tick(); 
    }  
      
   tick = function(e) {	   
    node.attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    });
    link.attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    });
    return text.attr("x", function(d) {
      return d.x + 12;
    }).attr("y", function(d) {
      return d.y;
    });
  }; 
  
   mapNodes = function(nodes) {
    var nodesMap;
    nodesMap = d3.map();
    nodes.forEach(function(n) {
      return nodesMap.set(n.id, n);
    });      
    return nodesMap;
  };
  
   neighboring1 = function(a, b) {
    return linkedByIndex[a.id + "," + b.id] || linkedByIndex[b.id + "," + a.id];
  };
  
   neighboring2 = function(a, b) {
    return linkedByIndex[a.id + "," + b.id];
  };
  
   neighboring3 = function(a, b) {
    return linkedByIndex[b.id + "," + a.id];
  };
  
  showDetails = function(d, i) {	
    var content;
    content = '<p>' + d.name + '</p>';
    content += '<hr class="tooltip-hr">';
    content += '<p>Fokusgruppe ' + d.fg + '</p>';   
    if (link) {
      link.attr("stroke", function(l) {
        if (l.source === d || l.target === d) {
          return "#555";
        } else {
          return "#aaa";
        }
      }).attr("stroke-opacity", function(l) {
        if (l.source === d || l.target === d) {
          return 1.0;
        } else {
          return 0.5;
        }
      }).style("marker-end", function(l) {
        if (l.source === d || l.target === d) {
          return "url(#high)";
        } else {
          return "url(#low)";
        }
      });
    }   
    node.style("stroke", function(n) {
      if (n.searched || neighboring1(d, n)) {
        return "#555";
      } else {
        return "#aaa";
      }
    }).style("stroke-width", function(n) {
      if (n.searched || neighboring1(d, n)) {		
		return 2.0;
      } else {
        return 1.0;
      }
    }); 
    jQuery('#infobox').html(content);
    jQuery('#infobox').removeClass("hidden");   
    return d3.select(this).style("stroke", "black").style("stroke-width", 2.0);
  };
  
  hideDetails = function(d, i) {
  jQuery('#infobox').html("");
  jQuery('#infobox').addClass("hidden");
    node.style("stroke", function(n) {
      if (!n.searched) {
        return "#555";
      } else {
        return "#aaa";
      }
    }).style("stroke-width", function(n) {
      if (!n.searched) {
        return 1.0;
      } else {
        return 2.0;
      }
    });
    if (link) {
      return link.attr("stroke", "#aaa").attr("stroke-opacity", 0.8).style("marker-end",  "url(#normal)");
    }
  };
  
   daspfa = function() {	
		node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
			return d.id;
		});
		node.style("fill", function(d) {	
			return farben1[d.fg]; 
		}); 
	}
  
   daspf2a = function() {
	dasp2 = jQuery("#ak").val();		
	node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
      return d.id;
    });
    node.style("fill", function(d) {
	  switch(dasp2) {
		 case "1": return farben2(d.ak1);
		 case "2": return farben2(d.ak2);
		 case "3": return farben2(d.ak3);
		 case "4": return farben2(d.ak4);
		 case "5": return farben2(d.ak5);		
	  }	 
    }); 
	}
  
   daspf3a = function() {
	dasp3 = jQuery("#zg").val();	     
	node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
     
      return d.id;
    });
    node.style("fill", function(d) {
	  switch(dasp3) {
		 case "1": return farben2(d.zg1);
		 case "2": return farben2(d.zg2);
		 case "7": return farben2(d.zg7);
		 case "3": return farben2(d.zg3);
		 case "4": return farben2(d.zg4);		
	  }	 
    });  
	} 
	
  klick = function() { console.log(status); }
	 
  return network;
};

Network2 = function() {
  var allData, dragmove, force, hideDetails, link, linkedByIndex, linksG, mapNodes, neighboring1, neighboring2, neighboring3, network, node, nodesG, node_drag, setupData, showDetails, text, textG, tick, updateLinks, updateNodes, updateText;
  allData = [];
  linkedByIndex = {};
  force = d3.layout.force();  
  
  network = function(selection, data) {
    var vis;
    allData = setupData(data);
    vis = d3.select(selection).append("svg").attr("width", width).attr("height", height);
    vis.append("defs").selectAll("marker")
    .data(["normal2"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("opacity", "0.8");
    vis.append("defs").selectAll("marker")
    .data(["high2"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#555")
    .style("opacity", "1.0");
     vis.append("defs").selectAll("marker")
    .data(["low2"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("opacity", "0.5");
    linksG = vis.append("g").attr("id", "links");
    nodesG = vis.append("g").attr("id", "nodes"); 
    textG = vis.append("g").attr("id", "text");        
    node_drag = d3.behavior.drag().on("drag", dragmove);
    updateNodes(); 
    updateLinks();  
    updateText();      
    return;  
  };
  
   setupData = function(data) {
    var nodesMap;   
    data.nodes.forEach(function(n) {    
      n.x = n.x * width;
      n.y = n.y * height;
      return n.radius = 10;
    });
    nodesMap = mapNodes(data.nodes);
    data.links.forEach(function(l) {
      l.source = nodesMap.get(l.source);
      l.target = nodesMap.get(l.target);
      return linkedByIndex[l.source.id + "," + l.target.id] = 1;
    });
    return data;
  };
   
  updateNodes = function() {	 
    node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
      return d.id;
    });
    node.enter().append("circle").attr("class", "node").attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    }).attr("r", function(d) {
      return d.radius;
    }).style("fill", function(d) {		
		 return farben1[d.fg];	
    }).style("stroke", "#555")
    .style("stroke-width", 1.0); 
    node.on("mouseover", showDetails).on("mouseout", hideDetails).call(node_drag);
    return node.exit().remove();
  };
  
  updateLinks = function() {
    link = linksG.selectAll("line.link").data(allData.links, function(d) {
      return d.source.id + "_" + d.target.id;
    });
    link.enter().append("line").attr("class", "link").attr("stroke", "#aaa").attr("stroke-opacity", 0.8).attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    }).style("marker-end",  "url(#normal2)");
    return link.exit().remove();
  };  
  
  updateText = function() {
    text = textG.selectAll("text.text").data(allData.nodes, function(d) {
      return d.id;
    });
    text.enter().append("text").text(function(d) {
		return d.name;
	}).attr("class", "text")
	.attr("x", function(d) {
      return d.x + 12;
    }).attr("y", function(d) {
      return d.y;
    }).attr("r", function(d) {
      return d.radius;
    }).attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "black"); 
    return text.exit().remove();
  };
  
    dragmove =  function (d, i) {
        if ((d3.event.dx < 0) && !((d.x + d3.event.dx) < 15 )) d.x += d3.event.dx;
	    if ((d3.event.dx > 0) && !((d.x + d3.event.dx) > (width - 15) )) d.x += d3.event.dx;	   
	    if ((d3.event.dy < 0) && !((d.y + d3.event.dy) < 15 )) d.y += d3.event.dy;
        if ((d3.event.dy > 0) && !((d.y + d3.event.dy) > (height - 15) )) d.y += d3.event.dy;
        tick(); 
    }    
   tick = function(e) {
    node.attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    });
    link.attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    });
    return text.attr("x", function(d) {
      return d.x + 12;
    }).attr("y", function(d) {
      return d.y;
    });
  }; 
  
   mapNodes = function(nodes) {
    var nodesMap;
    nodesMap = d3.map();
    nodes.forEach(function(n) {
      return nodesMap.set(n.id, n);
    });      
    return nodesMap;
  };
  
   neighboring1 = function(a, b) {
    return linkedByIndex[a.id + "," + b.id] || linkedByIndex[b.id + "," + a.id];
  };
  
   neighboring2 = function(a, b) {
    return linkedByIndex[a.id + "," + b.id];
  };
  
   neighboring3 = function(a, b) {
    return linkedByIndex[b.id + "," + a.id];
  };
  
  showDetails = function(d, i) {
    var content;
    content = '<p>' + d.name + '</p>';
    content += '<hr class="tooltip-hr">';
    content += '<p>Fokusgruppe ' + d.fg + '</p>';   
    if (link) {
      link.attr("stroke", function(l) {
        if (l.source === d || l.target === d) {
          return "#555";
        } else {
          return "#aaa";
        }
      }).attr("stroke-opacity", function(l) {
        if (l.source === d || l.target === d) {
          return 1.0;
        } else {
          return 0.5;
        }
      }).style("marker-end", function(l) {
        if (l.source === d || l.target === d) {
          return "url(#high2)";
        } else {
          return "url(#low2)";
        }
      });
    }   
    node.style("stroke", function(n) {
      if (n.searched || neighboring1(d, n)) {
        return "#555";
      } else {
        return "#aaa";
      }
    }).style("stroke-width", function(n) {
      if (n.searched || neighboring1(d, n)) {		
		return 2.0;
      } else {
        return 1.0;
      }
    }); 
    jQuery('#infobox').html(content);
    jQuery('#infobox').removeClass("hidden");
    return d3.select(this).style("stroke", "black").style("stroke-width", 2.0);
  };
  
  hideDetails = function(d, i) {
  jQuery('#infobox').html("");
  jQuery('#infobox').addClass("hidden");
    node.style("stroke", function(n) {
      if (!n.searched) {
        return "#555";
      } else {
        return "#aaa";
      }
    }).style("stroke-width", function(n) {
      if (!n.searched) {
        return 1.0;
      } else {
        return 2.0;
      }
    });
    if (link) {
      return link.attr("stroke", "#aaa").attr("stroke-opacity", 0.8).style("marker-end",  "url(#normal2)");
    }
  };
  
   daspfb = function() {	
		node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
			return d.id;
		});
		node.style("fill", function(d) {	
			return farben1[d.fg]; 
		}); 
	}
  
   daspf2b = function() {
	dasp2 = jQuery("#ak").val();		
	node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
      return d.id;
    });
    node.style("fill", function(d) {
	  switch(dasp2) {
		 case "1": return farben2(d.ak1);
		 case "2": return farben2(d.ak2);
		 case "3": return farben2(d.ak3);
		 case "4": return farben2(d.ak4);
		 case "5": return farben2(d.ak5);		
	  }	 
    }); 
	}
  
   daspf3b = function() {
	dasp3 = jQuery("#zg").val();	     
	node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
     
      return d.id;
    });
    node.style("fill", function(d) {
	  switch(dasp3) {
		 case "1": return farben2(d.zg1);
		 case "2": return farben2(d.zg2);
		 case "7": return farben2(d.zg7);
		 case "3": return farben2(d.zg3);
		 case "4": return farben2(d.zg4);		
	  }	 
    });  
	} 
	
  klick = function() { console.log(status); }
	 
  return network;
};

Network3 = function() {
  var allData, dragmove, force, hideDetails, link, linkedByIndex, linksG, mapNodes, neighboring1, neighboring2, neighboring3, network, node, nodesG, node_drag, setupData, showDetails, text, textG, tick, updateLinks, updateNodes, updateText;
  allData = [];
  linkedByIndex = {};
  force = d3.layout.force(); 
  
  network = function(selection, data) {
    var vis;   
    allData = setupData(data);
    vis = d3.select(selection).append("svg").attr("width", width).attr("height", height);
    vis.append("defs").selectAll("marker")
    .data(["normal3"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("opacity", "0.8");
    vis.append("defs").selectAll("marker")
    .data(["high3"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#555")
    .style("opacity", "1.0");
     vis.append("defs").selectAll("marker")
    .data(["low3"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("opacity", "0.5");
    linksG = vis.append("g").attr("id", "links");
    nodesG = vis.append("g").attr("id", "nodes"); 
    textG = vis.append("g").attr("id", "text");        
    node_drag = d3.behavior.drag().on("drag", dragmove);
    updateNodes(); 
    updateLinks();  
    updateText();      
    return;  
  };
  
   setupData = function(data) {
    var nodesMap;   
    data.nodes.forEach(function(n) {    
      n.x = n.x * width;
      n.y = n.y * height;
      return n.radius = 10;
    });
    nodesMap = mapNodes(data.nodes);
    data.links.forEach(function(l) {
      l.source = nodesMap.get(l.source);
      l.target = nodesMap.get(l.target);
      return linkedByIndex[l.source.id + "," + l.target.id] = 1;
    });
    return data;
  };
   
  updateNodes = function() {	 
    node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
      return d.id;
    });
    node.enter().append("circle").attr("class", "node").attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    }).attr("r", function(d) {
      return d.radius;
    }).style("fill", function(d) {		
		 return farben1[d.fg];	
    }).style("stroke", "#555")
    .style("stroke-width", 1.0); 
    node.on("mouseover", showDetails).on("mouseout", hideDetails).call(node_drag);    
    return node.exit().remove();
  };
  
  updateLinks = function() {
    link = linksG.selectAll("line.link").data(allData.links, function(d) {
      return d.source.id + "_" + d.target.id;
    });
    link.enter().append("line").attr("class", "link").attr("stroke", "#aaa").attr("stroke-opacity", 0.8).attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    }).style("marker-end",  "url(#normal3)");
    return link.exit().remove();
  };  
  
  updateText = function() {
    text = textG.selectAll("text.text").data(allData.nodes, function(d) {
      return d.id;
    });
    text.enter().append("text").text(function(d) {
		return d.name;
	}).attr("class", "text")
	.attr("x", function(d) {
      return d.x + 12;
    }).attr("y", function(d) {
      return d.y;
    }).attr("r", function(d) {
      return d.radius;
    }).attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "black"); 
    return text.exit().remove();
  };
  
    dragmove =  function (d, i) {
        if ((d3.event.dx < 0) && !((d.x + d3.event.dx) < 15 )) d.x += d3.event.dx;
	    if ((d3.event.dx > 0) && !((d.x + d3.event.dx) > (width - 15) )) d.x += d3.event.dx;	   
	    if ((d3.event.dy < 0) && !((d.y + d3.event.dy) < 15 )) d.y += d3.event.dy;
        if ((d3.event.dy > 0) && !((d.y + d3.event.dy) > (height - 15) )) d.y += d3.event.dy;
        tick(); 
    }  
      
   tick = function(e) {
    node.attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    });
    link.attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    });
    return text.attr("x", function(d) {
      return d.x + 12;
    }).attr("y", function(d) {
      return d.y;
    });
  }; 
  
   mapNodes = function(nodes) {
    var nodesMap;
    nodesMap = d3.map();
    nodes.forEach(function(n) {
      return nodesMap.set(n.id, n);
    });      
    return nodesMap;
  };
  
   neighboring1 = function(a, b) {
    return linkedByIndex[a.id + "," + b.id] || linkedByIndex[b.id + "," + a.id];
  };
  
   neighboring2 = function(a, b) {
    return linkedByIndex[a.id + "," + b.id];
  };
  
   neighboring3 = function(a, b) {
    return linkedByIndex[b.id + "," + a.id];
  };
  
  showDetails = function(d, i) {
    var content;
    content = '<p>' + d.name + '</p>';
    content += '<hr class="tooltip-hr">';
    content += '<p>Fokusgruppe ' + d.fg + '</p>';   
    if (link) {
      link.attr("stroke", function(l) {
        if (l.source === d || l.target === d) {
          return "#555";
        } else {
          return "#aaa";
        }
      }).attr("stroke-opacity", function(l) {
        if (l.source === d || l.target === d) {
          return 1.0;
        } else {
          return 0.5;
        }
      }).style("marker-end", function(l) {
        if (l.source === d || l.target === d) {
          return "url(#high3)";
        } else {
          return "url(#low3)";
        }
      });
    }   
    node.style("stroke", function(n) {
      if (n.searched || neighboring1(d, n)) {
        return "#555";
      } else {
        return "#aaa";
      }
    }).style("stroke-width", function(n) {
      if (n.searched || neighboring1(d, n)) {		
		return 2.0;
      } else {
        return 1.0;
      }
    }); 
    jQuery('#infobox').html(content);
    jQuery('#infobox').removeClass("hidden");
    return d3.select(this).style("stroke", "black").style("stroke-width", 2.0);
  };
  
  hideDetails = function(d, i) {
  jQuery('#infobox').html("");
  jQuery('#infobox').addClass("hidden");
    node.style("stroke", function(n) {
      if (!n.searched) {
        return "#555";
      } else {
        return "#aaa";
      }
    }).style("stroke-width", function(n) {
      if (!n.searched) {
        return 1.0;
      } else {
        return 2.0;
      }
    });
    if (link) {
      return link.attr("stroke", "#aaa").attr("stroke-opacity", 0.8).style("marker-end",  "url(#normal3)");
    }
  };
  
   daspfc = function() {	
		node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
			return d.id;
		});
		node.style("fill", function(d) {	
			return farben1[d.fg]; 
		}); 
	}
  
   daspf2c = function() {
	dasp2 = jQuery("#ak").val();		
	node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
      return d.id;
    });
    node.style("fill", function(d) {
	  switch(dasp2) {
		 case "1": return farben2(d.ak1);
		 case "2": return farben2(d.ak2);
		 case "3": return farben2(d.ak3);
		 case "4": return farben2(d.ak4);
		 case "5": return farben2(d.ak5);		
	  }	 
    }); 
	}
  
   daspf3c = function() {
	dasp3 = jQuery("#zg").val();	     
	node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
     
      return d.id;
    });
    node.style("fill", function(d) {
	  switch(dasp3) {
		 case "1": return farben2(d.zg1);
		 case "2": return farben2(d.zg2);
		 case "7": return farben2(d.zg7);
		 case "3": return farben2(d.zg3);
		 case "4": return farben2(d.zg4);		
	  }	 
    });  
	} 
		 
  return network;
};

Network4 = function() {
  var allData, dragmove, force, hideDetails, link, linkedByIndex, linksG, mapNodes, neighboring1, neighboring2, neighboring3, network, node, nodesG, node_drag, setupData, showDetails, text, textG, tick, updateLinks, updateNodes, updateText;
  allData = [];
  linkedByIndex = {};
  force = d3.layout.force(); 
  
  network = function(selection, data) {
    var vis;   
    allData = setupData(data);
    vis = d3.select(selection).append("svg").attr("width", width).attr("height", height);
    vis.append("defs").selectAll("marker")
    .data(["normal4"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("opacity", "0.8");
    vis.append("defs").selectAll("marker")
    .data(["high4"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#555")
    .style("opacity", "1.0");
     vis.append("defs").selectAll("marker")
    .data(["low4"])
	.enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 8)
    .attr("markerHeight", 8)
    .attr("orient", "auto")
	.append("path")
    .attr("d", "M 0 0 L -2.00 5.00 L 10.00 0 L -2.00 -5.00 z")
    .style("stroke", "#aaa")
    .style("fill", "#aaa")
    .style("opacity", "0.5");
    linksG = vis.append("g").attr("id", "links");
    nodesG = vis.append("g").attr("id", "nodes"); 
    textG = vis.append("g").attr("id", "text");        
    node_drag = d3.behavior.drag().on("drag", dragmove);
    updateNodes(); 
    updateLinks();  
    updateText();      
    return;  
  };
  
   setupData = function(data) {
    var nodesMap;   
    data.nodes.forEach(function(n) {    
      n.x = n.x * width;
      n.y = n.y * height;
      return n.radius = 10;
    });
    nodesMap = mapNodes(data.nodes);
    data.links.forEach(function(l) {
      l.source = nodesMap.get(l.source);
      l.target = nodesMap.get(l.target);
      return linkedByIndex[l.source.id + "," + l.target.id] = 1;
    });
    return data;
  };
   
  updateNodes = function() {	 
    node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
      return d.id;
    });
    node.enter().append("circle").attr("class", "node").attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    }).attr("r", function(d) {
      return d.radius;
    }).style("fill", function(d) {		
		 return farben1[d.fg];	
    }).style("stroke", "#555")
    .style("stroke-width", 1.0); 
    node.on("mouseover", showDetails).on("mouseout", hideDetails).call(node_drag);
    return node.exit().remove();
  };
  
  updateLinks = function() {
    link = linksG.selectAll("line.link").data(allData.links, function(d) {
      return d.source.id + "_" + d.target.id;
    });
    link.enter().append("line").attr("class", "link").attr("stroke", "#aaa").attr("stroke-opacity", 0.8).attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    }).style("marker-end",  "url(#normal4)");
    return link.exit().remove();
  };  
  
  updateText = function() {
    text = textG.selectAll("text.text").data(allData.nodes, function(d) {
      return d.id;
    });
    text.enter().append("text").text(function(d) {
		return d.name;
	}).attr("class", "text")
	.attr("x", function(d) {
      return d.x + 12;
    }).attr("y", function(d) {
      return d.y;
    }).attr("r", function(d) {
      return d.radius;
    }).attr("font-family", "sans-serif")
	.attr("font-size", "11px")
	.attr("fill", "black"); 
    return text.exit().remove();
  };
  
    dragmove =  function (d, i) {
        if ((d3.event.dx < 0) && !((d.x + d3.event.dx) < 15 )) d.x += d3.event.dx;
	    if ((d3.event.dx > 0) && !((d.x + d3.event.dx) > (width - 15) )) d.x += d3.event.dx;	   
	    if ((d3.event.dy < 0) && !((d.y + d3.event.dy) < 15 )) d.y += d3.event.dy;
        if ((d3.event.dy > 0) && !((d.y + d3.event.dy) > (height - 15) )) d.y += d3.event.dy;
        tick(); 
    }    
   tick = function(e) {
    node.attr("cx", function(d) {
      return d.x;
    }).attr("cy", function(d) {
      return d.y;
    });
    link.attr("x1", function(d) {
      return d.source.x;
    }).attr("y1", function(d) {
      return d.source.y;
    }).attr("x2", function(d) {
      return d.target.x;
    }).attr("y2", function(d) {
      return d.target.y;
    });
    return text.attr("x", function(d) {
      return d.x + 12;
    }).attr("y", function(d) {
      return d.y;
    });
  }; 
  
   mapNodes = function(nodes) {
    var nodesMap;
    nodesMap = d3.map();
    nodes.forEach(function(n) {
      return nodesMap.set(n.id, n);
    });      
    return nodesMap;
  };
  
   neighboring1 = function(a, b) {
    return linkedByIndex[a.id + "," + b.id] || linkedByIndex[b.id + "," + a.id];
  };
  
   neighboring2 = function(a, b) {
    return linkedByIndex[a.id + "," + b.id];
  };
  
   neighboring3 = function(a, b) {
    return linkedByIndex[b.id + "," + a.id];
  };
  
  showDetails = function(d, i) {
    var content;
    content = '<p>' + d.name + '</p>';
    content += '<hr class="tooltip-hr">';
    content += '<p>Fokusgruppe ' + d.fg + '</p>';   
    if (link) {
      link.attr("stroke", function(l) {
        if (l.source === d || l.target === d) {
          return "#555";
        } else {
          return "#aaa";
        }
      }).attr("stroke-opacity", function(l) {
        if (l.source === d || l.target === d) {
          return 1.0;
        } else {
          return 0.5;
        }
      }).style("marker-end", function(l) {
        if (l.source === d || l.target === d) {
          return "url(#high4)";
        } else {
          return "url(#low4)";
        }
      });
    }   
    node.style("stroke", function(n) {
      if (n.searched || neighboring1(d, n)) {
        return "#555";
      } else {
        return "#aaa";
      }
    }).style("stroke-width", function(n) {
      if (n.searched || neighboring1(d, n)) {		
		return 2.0;
      } else {
        return 1.0;
      }
    }); 
    jQuery('#infobox').html(content);
    jQuery('#infobox').removeClass("hidden");
    return d3.select(this).style("stroke", "black").style("stroke-width", 2.0);
  };
  
  hideDetails = function(d, i) {
  jQuery('#infobox').html("");
  jQuery('#infobox').addClass("hidden");
    node.style("stroke", function(n) {
      if (!n.searched) {
        return "#555";
      } else {
        return "#aaa";
      }
    }).style("stroke-width", function(n) {
      if (!n.searched) {
        return 1.0;
      } else {
        return 2.0;
      }
    });
    if (link) {
      return link.attr("stroke", "#aaa").attr("stroke-opacity", 0.8).style("marker-end",  "url(#normal4)");
    }
  };
  
   daspfd = function() {	
		node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
			return d.id;
		});
		node.style("fill", function(d) {	
			return farben1[d.fg]; 
		}); 
	}
  
   daspf2d = function() {
	dasp2 = jQuery("#ak").val();		
	node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
      return d.id;
    });
    node.style("fill", function(d) {
	  switch(dasp2) {
		 case "1": return farben2(d.ak1);
		 case "2": return farben2(d.ak2);
		 case "3": return farben2(d.ak3);
		 case "4": return farben2(d.ak4);
		 case "5": return farben2(d.ak5);		
	  }	 
    }); 
	}
  
   daspf3d = function() {
	dasp3 = jQuery("#zg").val();	     
	node = nodesG.selectAll("circle.node").data(allData.nodes, function(d) {
     
      return d.id;
    });
    node.style("fill", function(d) {
	  switch(dasp3) {
		 case "1": return farben2(d.zg1);
		 case "2": return farben2(d.zg2);
		 case "7": return farben2(d.zg7);
		 case "3": return farben2(d.zg3);
		 case "4": return farben2(d.zg4);		
	  }	 
    });  
	} 
		 
  return network;
};

jQuery(function() { 
  var myNetwork;
  myNetwork = Network1(); 
  d3.json("../sites/all/themes/adaptivetheme/indeko7/js_network/data/bekanntheit2.json", function(json) {
    netz1 = myNetwork("#vis1", json);
    return netz1;
  }); 
  var myNetwork2;
  myNetwork2 = Network2(); 
  d3.json("../sites/all/themes/adaptivetheme/indeko7/js_network/data/interesse2.json", function(json) {
    netz2 = myNetwork2("#vis2", json);
    return netz2;
  }); 
  var myNetwork3;
  myNetwork3 = Network3(); 
  d3.json("../sites/all/themes/adaptivetheme/indeko7/js_network/data/austausch2.json", function(json) {
    netz3 =  myNetwork3("#vis3", json);
    return netz3;
  });
  var myNetwork4;
  myNetwork4 = Network4(); 
  d3.json("../sites/all/themes/adaptivetheme/indeko7/js_network/data/mehraustausch2.json", function(json) {
    netz4 = myNetwork4("#vis4", json);
    return netz4;
  });  
});

function modus(m) {	
	switch(m) {
		case 1: mode = 1;				
				jQuery("#einleitung").removeClass("hidden");				
				jQuery("#vis").addClass("hidden");
				jQuery("#relart").addClass("hidden");
				jQuery("#aspart").addClass("hidden");
				jQuery("#con1").addClass("hidden");	
				jQuery("#con2").addClass("hidden");
				jQuery("#con3").addClass("hidden");	
				jQuery("#con3").addClass("hidden");	
				jQuery("#details").addClass("hidden");					
				break;
		case 2: mode = 2;	
				relationsart = 1;
				aspekte = 1;
				demografischerAspekt = 1;
				zielgruppe = 1;				
				jQuery("#einleitung").addClass("hidden");
				jQuery("#vis").removeClass("hidden");				
				jQuery("#rel").val(relationsart);
				jQuery("#relart").removeClass("hidden");
				jQuery("#asp").val(aspekte);
				jQuery("#aspart").removeClass("hidden");
				jQuery("#con1").removeClass("hidden");
				jQuery("#con2").addClass("hidden");	
				jQuery("#con3").addClass("hidden");	
				jQuery("#details").removeClass("hidden");
				relation();
				break;		
	}
	
}

function relation() {
	 r = jQuery("#rel").val();
	 a = jQuery("#asp").val();		 
	 switch(r) {
		case "1": relationsart = 1;
				  jQuery("#vis1").removeClass("hidden");
				  jQuery("#vis2").addClass("hidden");
				  jQuery("#vis3").addClass("hidden");
				  jQuery("#vis4").addClass("hidden");
				  switch(a) {
					case "1": daspfa(); break;
					case "2": daspf2a(); break;
					case "3": daspf3a(); break;
				  }							  				
				  break;
		case "2": relationsart = 2;
				  jQuery("#vis1").addClass("hidden");
				  jQuery("#vis2").removeClass("hidden");
				  jQuery("#vis3").addClass("hidden");
				  jQuery("#vis4").addClass("hidden");
				  switch(a) {
					case "1": daspfb(); break;
					case "2": daspf2b(); break;
					case "3": daspf3b(); break;
				  }						
				  break;
		case "3": relationsart = 3;
				  jQuery("#vis1").addClass("hidden");
				  jQuery("#vis2").addClass("hidden");
				  jQuery("#vis3").removeClass("hidden");
				  jQuery("#vis4").addClass("hidden");
				  switch(a) {
					case "1": daspfc(); break;
					case "2": daspf2c(); break;
					case "3": daspf3c(); break;
				  }							
				  break;
		case "4": relationsart = 4;
				  jQuery("#vis1").addClass("hidden");
				  jQuery("#vis2").addClass("hidden");
				  jQuery("#vis3").addClass("hidden");
				  jQuery("#vis4").removeClass("hidden");	
				  switch(a) {
					case "1": daspfd(); break;
					case "2": daspf2d(); break;
					case "3": daspf3d(); break;
				  }						  				
				  break;
	}
	
}

function aspekt() {
	 a = jQuery("#asp").val();
	 r = jQuery("#rel").val();	 	 
	 switch(a) {
		case "1": aspekte = 1;
				  jQuery("#con1").removeClass("hidden");
				  jQuery("#con2").addClass("hidden");
				  jQuery("#con3").addClass("hidden");
				  switch(r) {
					case "1": daspfa(); break;
					case "2": daspfb(); break;
					case "3": daspfc(); break;
					case "4": daspfd(); break;
				  }							
				  break;
		case "2": aspekte = 2;
				  jQuery("#con1").addClass("hidden");
				  jQuery("#con2").removeClass("hidden");
				  jQuery("#ak").val(demografischerAspekt);
				  jQuery("#con3").addClass("hidden");
				  switch(r) {
					case "1": daspf2a(); break;
					case "2": daspf2b(); break;
					case "3": daspf2c(); break;
					case "4": daspf2d(); break;
				  }										
				  break;
		case "3": aspekte = 3;
				  jQuery("#con1").addClass("hidden");
				  jQuery("#con2").addClass("hidden");
				  jQuery("#con3").removeClass("hidden");
				  jQuery("#zg").val(zielgruppe);
				  switch(r) {
					case "1": daspf3a(); break;
					case "2": daspf3b(); break;
					case "3": daspf3c(); break;
					case "4": daspf3d(); break;
				  }							
				  break;
	}	
}

function changeDemAsp() {
	r = jQuery("#rel").val();
	demografischerAspekt = jQuery("#ak").val();
	switch(r) {
		case "1": daspf2a(); break;
		case "2": daspf2b(); break;
		case "3": daspf2c(); break;
		case "4": daspf2d(); break;
	}				
}

function changeZG() {
	r = jQuery("#rel").val();
	zielgruppe = jQuery("#zg").val();
	switch(r) {
		case "1": daspf3a(); break;
		case "2": daspf3b(); break;
		case "3": daspf3c(); break;
		case "4": daspf3d(); break;
	}		
} 


