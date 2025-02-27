function EntropyForceGraph({
    nodes, 
    links, 
    options = {}
  }) {
    const {
      width = 2400,
      height = 1600,
      nodeRadius = 8
    } = options;
  
    const minEntropyProduction = Math.min(...nodes.map(n => n.entropyProduction));
    const maxEntropyProduction = Math.max(...nodes.map(n => n.entropyProduction));
    
    // Theme-based color mapping
    const themeColors = {
      'quantum': '#3B8BD9',    // DeepSkyBlue for quantum processes
      'atomic': '#3B8BD9',     // DodgerBlue for atomic/molecular
      'biological': '#ADE564', // LimeGreen for all biological entities
      'cosmic': '#7B63C0',     // MediumPurple for all cosmic objects
      'technology': '#F2A737', // DarkOrange for all technology/human creations
      'default': '#808080'     // Gray for anything else
    };
    
    // Custom scale function with reduced gaps and smoother high-value scaling
    function customEntropyScale(value) {
        if (value <= 1e-5) {
          return d3.scaleLog()
            .domain([1e-20, 1e-5])
            .range([220, 350])(value);
        } else if (value <= 1e3) {
          return d3.scaleLog()
            .domain([1e-5, 1e3])
            .range([350, 500])(value);
        } else if (value <= 1e20) {
          return d3.scaleLog()
            .domain([1e3, 1e20])
            .range([500, 900])(value);
        } else if (value < 1e90) {
          return d3.scalePow()
            .exponent(0.01)
            .domain([1e20, 1e90])
            .range([900, 1950])(value);
        } else {
          return 2000;
        }
    }

    // Group nodes by entropy
    const nodesByEntropy = d3.group(nodes, d => d.entropyProduction);
    const sortedEntropies = Array.from(nodesByEntropy.keys()).sort((a, b) => a - b);
    
    const verticalSpacing = 100;
    
    // Position nodes
    const nodePositions = new Map();
    sortedEntropies.forEach((entropy, entropyIndex) => {
      const entropyNodes = nodesByEntropy.get(entropy);
      const x = customEntropyScale(entropy);
      
      entropyNodes.forEach((node, nodeIndex) => {
        const columnHeight = entropyNodes.length * verticalSpacing;
        const y = height / 2 - (columnHeight / 2) + (nodeIndex * verticalSpacing);
        nodePositions.set(node.id, { x, y });
      });
    });
  
    // Create base SVG
    const svg = d3.select("#universe-graph")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("cursor", "default");

    // Create a main group for zoom
    const g = svg.append("g");

    // Calculate initial zoom to center and slightly zoom
    const initialScale = 1.4; // Slightly bigger zoom
    const containerWidth = width;
    const containerHeight = height;
    
    // Centering calculations
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;

    // Zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([0.1, 10])  // Limit zoom levels
      .on("zoom", (event) => {
        // Update the main group's transform
        g.attr("transform", event.transform);
      });

    // Add zoom to svg with wheel prevention
    svg.call(zoom)
       .on("wheel.zoom", null)  // Prevent scroll wheel zoom
       // Set initial transform to center and zoom
       .call(zoom.transform, d3.zoomIdentity
         .translate(containerWidth/2, containerHeight/2)
         .scale(initialScale)
         .translate(-centerX, -centerY)
       );

    // Attach zoom controls
    document.getElementById('zoom-in').addEventListener('click', () => {
      svg.transition().call(zoom.scaleBy, 1.5);
    });

    document.getElementById('zoom-out').addEventListener('click', () => {
      svg.transition().call(zoom.scaleBy, 0.667);
    });

    document.getElementById('zoom-reset').addEventListener('click', () => {
      svg.transition().call(zoom.transform, 
        d3.zoomIdentity
          .translate(containerWidth/2, containerHeight/2)
          .scale(initialScale)
          .translate(-centerX, -centerY)
      );
    });

    // Recursive function to find ancestor nodes and their connections
    function findAncestorsAndLinks(nodeId) {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return { ancestorIds: [], ancestorLinks: [] };

      const ancestorIds = new Set([nodeId]);
      const ancestorLinks = [];
      const visitedNodes = new Set([nodeId]);

      function findAncestors(currentNodeId) {
        const currentNode = nodes.find(n => n.id === currentNodeId);
        
        // Find all links targeting the current node with lower entropy
        const incomingLinks = links.filter(l => 
          l.target.id === currentNodeId && 
          l.source.entropyProduction < currentNode.entropyProduction
        );

        incomingLinks.forEach(link => {
          const sourceId = link.source.id;
          
          // Only process if not already visited
          if (!visitedNodes.has(sourceId)) {
            visitedNodes.add(sourceId);
            ancestorIds.add(sourceId);
            ancestorLinks.push(link);
            
            // Recursively find more ancestors
            findAncestors(sourceId);
          }
        });
      }

      // Start recursive ancestor finding
      findAncestors(nodeId);

      return { 
        ancestorIds: Array.from(ancestorIds), 
        ancestorLinks 
      };
    }

    // Create links
    const link = g.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5);
  
    // Create nodes with theme-based coloring
    const node = g.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", nodeRadius)
      .attr("fill", d => {
        // Safe access to theme property with fallback
        const theme = d.theme || 'default';
        return themeColors[theme] || themeColors.default;
      })
      .style("cursor", "pointer");

    // Improved label positioning
    const labels = g.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.name)
      .attr("font-size", 10)
      .attr("fill", "#e0e6ed")
      .attr("text-anchor", "middle")
      .attr("x", d => {
        const pos = nodePositions.get(d.id);
        return pos ? pos.x : 0;
      })
      .attr("y", d => {
        const pos = nodePositions.get(d.id);
        return pos ? (pos.y - nodeRadius - 20) : 0;  // Moved above the node
      });
  
    // Track current selected node
    let currentSelectedNode = null;

    // Node click handler
    function handleNodeClick(event, clickedNode) {
      // If clicking the same node, unselect
      if (currentSelectedNode === clickedNode) {
        // Reset all nodes and links to default state
        node
          .attr("r", nodeRadius)
          .style("fill-opacity", 1)
          .style("stroke", "none");
        
        link
          .style("stroke-opacity", 0.6)
          .style("stroke-width", 1.5)
          .style("stroke", "#999");  // Reset link color
        
        labels
          .style("fill-opacity", 1)
          .style("font-size", 10);

        currentSelectedNode = null;
        return;
      }

      // Reset all nodes and links to default state
      node
        .attr("r", nodeRadius)
        .style("fill-opacity", 0.3)
        .style("stroke", "none");
      
      link
        .style("stroke-opacity", 0.1)
        .style("stroke-width", 1)
        .style("stroke", "#999");  // Ensure default color
      
      labels
        .style("fill-opacity", 0.1)
        .style("font-size", 6);

      // Find ancestor nodes and links
      const { ancestorIds, ancestorLinks } = findAncestorsAndLinks(clickedNode.id);

      // Highlight selected nodes and their ancestors
      node
        .filter(d => ancestorIds.includes(d.id))
        .attr("r", nodeRadius * 1.5)
        .style("fill-opacity", 1)
        .style("stroke", "white")
        .style("stroke-width", 2);
      
      // Highlight relevant links
      link
        .filter(d => ancestorLinks.includes(d))
        .style("stroke-opacity", 1)
        .style("stroke-width", 3)
        .style("stroke", "#3B8BD9");  // Highlight color for links
      
      // Highlight relevant labels
      labels
        .filter(d => ancestorIds.includes(d.id))
        .style("fill-opacity", 1)
        .style("font-size", 10);

      currentSelectedNode = clickedNode;
    }

    // Attach click event to nodes
    node.on("click", handleNodeClick);
  
    // Add theme filter functionality
    document.querySelectorAll('.theme-filter').forEach(button => {
      button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        
        // Reset all nodes and links to default state
        node
          .attr("r", nodeRadius)
          .style("fill-opacity", theme === 'all' ? 1 : 0.3);
        
        link
          .style("stroke-opacity", theme === 'all' ? 0.6 : 0.1);
        
        labels
          .style("fill-opacity", theme === 'all' ? 1 : 0.1);

        // If not 'all', highlight specific theme nodes
        if (theme !== 'all') {
          // Highlight nodes of the selected theme
          const themeNodes = node.filter(d => d.theme === theme);
          
          themeNodes
            .attr("r", nodeRadius * 1.5)
            .style("fill-opacity", 1);
          
          // Find and highlight links connected to theme nodes
          const themeLinks = link.filter(d => 
            d.source.theme === theme || d.target.theme === theme
          );
          
          themeLinks
            .style("stroke-opacity", 1)
            .style("stroke-width", 2);
          
          // Highlight labels for theme nodes
          labels
            .filter(d => d.theme === theme)
            .style("fill-opacity", 1)
            .style("font-size", 10);
        }
      });
    });
  
    // Add titles for hover info
    const titleGroup = g.append("g")
      .attr("class", "hover-titles")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("transform", d => {
        const pos = nodePositions.get(d.id);
        return pos ? `translate(${pos.x}, ${pos.y})` : "translate(0,0)";
      });

    titleGroup.append("title")
      .text(d => `${d.name}\nTheme: ${d.theme || 'default'}\nEntropy Production: ${d.entropyProduction}\n${d.description}`);
  
    // Update positions on simulation tick
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("x", d3.forceX(d => nodePositions.get(d.id).x).strength(0.98))
      .force("y", d3.forceY(d => nodePositions.get(d.id).y).strength(0.98))
      .force("collision", d3.forceCollide(nodeRadius * 10))
      .on("tick", ticked);
  
    // Update positions function
    function ticked() {
      link
        .attr("x1", d => {
          const pos = nodePositions.get(d.source.id);
          return pos ? pos.x : 0;
        })
        .attr("y1", d => {
          const pos = nodePositions.get(d.source.id);
          return pos ? pos.y : 0;
        })
        .attr("x2", d => {
          const pos = nodePositions.get(d.target.id);
          return pos ? pos.x : 0;
        })
        .attr("y2", d => {
          const pos = nodePositions.get(d.target.id);
          return pos ? pos.y : 0;
        });
  
      node
        .attr("cx", d => {
          const pos = nodePositions.get(d.id);
          return pos ? pos.x : 0;
        })
        .attr("cy", d => {
          const pos = nodePositions.get(d.id);
          return pos ? pos.y : 0;
        });
  
      labels
        .attr("x", d => {
          const pos = nodePositions.get(d.id);
          return pos ? pos.x : 0;
        })
        .attr("y", d => {
          const pos = nodePositions.get(d.id);
          return pos ? (pos.y - nodeRadius - 20) : 0;
        });
    }
  
    // Return the created SVG with stop method
    return {
      stop: () => simulation.stop()
    };
  }
  
  // Main Execution
  document.addEventListener('DOMContentLoaded', () => {
    try {
      console.log("Creating entropy network...");
      const entropyNetwork = createEntropyNetwork();
      console.log("Exporting graph data...");
      const graphData = entropyNetwork.exportGraphData();
      console.log(`Network has ${graphData.nodes.length} nodes and ${graphData.links.length} links`);
      
      console.log("Creating force graph...");
      const graph = EntropyForceGraph({
        nodes: graphData.nodes,
        links: graphData.links,
        options: {
          width: 2400,
          height: 1600,
          nodeRadius: 10
        }
      });
      
      console.log("Graph successfully rendered");
    } catch (error) {
      console.error("Error creating graph:", error);
    }
  });
