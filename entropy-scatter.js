function createEntropyScatterPlot() {
    // Data for the scatter plot (unchanged)
    const scatterData = [
      // Quantum Objects
      { name: 'Quantum Vacuum', category: 'quantum', actualEntropy: 1, efficiency: 1 },
      { name: 'Fundamental Forces', category: 'quantum', actualEntropy: 5, efficiency: 3 },
      { name: 'Quarks', category: 'quantum', actualEntropy: 7, efficiency: 4 },
      { name: 'Electrons', category: 'quantum', actualEntropy: 10, efficiency: 8 },
      { name: 'Protons', category: 'quantum', actualEntropy: 10, efficiency: 8 },
      { name: 'Neutrons', category: 'quantum', actualEntropy: 10, efficiency: 8 },
      
      // Atomic Objects
      { name: 'Atoms', category: 'atomic', actualEntropy: 20, efficiency: 15 },
      { name: 'Molecular Bonding', category: 'atomic', actualEntropy: 35, efficiency: 25 },
      
      // Biological Objects
      { name: 'Organic Molecules', category: 'biological', actualEntropy: 50, efficiency: 50 },
      { name: 'Bacteria', category: 'biological', actualEntropy: 65, efficiency: 80 },
      { name: 'Cells', category: 'biological', actualEntropy: 70, efficiency: 100 },
      { name: 'Plant System', category: 'biological', actualEntropy: 90, efficiency: 150 },
      { name: 'Fungi', category: 'biological', actualEntropy: 85, efficiency: 160 },
      { name: 'Water Animals', category: 'biological', actualEntropy: 100, efficiency: 180 },
      { name: 'Fish', category: 'biological', actualEntropy: 110, efficiency: 200 },
      { name: 'Reptiles', category: 'biological', actualEntropy: 115, efficiency: 220 },
      { name: 'Early Mammals', category: 'biological', actualEntropy: 130, efficiency: 260 },
      { name: 'Humans', category: 'biological', actualEntropy: 150, efficiency: 300 },
      
      // Technological Objects
      { name: 'Controlled Fire', category: 'technology', actualEntropy: 80, efficiency: 320 },
      { name: 'Irrigation System', category: 'technology', actualEntropy: 170, efficiency: 340 },
      { name: 'Steam Engine', category: 'technology', actualEntropy: 160, efficiency: 420 },
      { name: 'Factories', category: 'technology', actualEntropy: 230, efficiency: 480 },
      { name: 'Towns', category: 'technology', actualEntropy: 200, efficiency: 450 },
      { name: 'Cities', category: 'technology', actualEntropy: 300, efficiency: 500 },
      { name: 'Power Plants', category: 'technology', actualEntropy: 280, efficiency: 440 },
      { name: 'Nuclear Fission', category: 'technology', actualEntropy: 320, efficiency: 550 },
      { name: 'Computer', category: 'technology', actualEntropy: 100, efficiency: 530 },
      { name: 'Social Media', category: 'technology', actualEntropy: 340, efficiency: 570 },
      
      // Cosmic Objects
      { name: 'Planets', category: 'cosmic', actualEntropy: 510, efficiency: 90 },
      { name: 'Medium Stars', category: 'cosmic', actualEntropy: 550, efficiency: 80 },
      { name: 'Giant Stars', category: 'cosmic', actualEntropy: 580, efficiency: 80 },
      { name: 'Neutron Star', category: 'cosmic', actualEntropy: 700, efficiency: 800 },
      { name: 'Galaxy', category: 'cosmic', actualEntropy: 750, efficiency: 130 },
      { name: 'Galaxy Cluster', category: 'cosmic', actualEntropy: 800, efficiency: 210 },
      { name: 'Blackhole', category: 'cosmic', actualEntropy: 850, efficiency: 820 },
      { name: 'Supermassive Black Hole', category: 'cosmic', actualEntropy: 900, efficiency: 900 },
      { name: 'Heat Death', category: 'cosmic', actualEntropy: 1000, efficiency: 1000 }
    ];
  
    // Theme colors to match the first graph
    const themeColors = {
      'quantum': '#3B8BD9',    // DeepSkyBlue for quantum processes
      'atomic': '#3B8BD9',     // Same color for atomic/molecular
      'biological': '#ADE564', // LimeGreen for all biological entities
      'cosmic': '#7B63C0',     // MediumPurple for all cosmic objects
      'technology': '#F2A737', // DarkOrange for all technology/human creations
      'default': '#808080'     // Gray for anything else
    };
  
    // Create the SVG
    const margin = { top: 60, right: 100, bottom: 80, left: 80 };
    const width = document.getElementById('additional-graph-container').clientWidth - margin.left - margin.right;
    const height = document.getElementById('additional-graph-container').clientHeight - margin.top - margin.bottom;
  
    // Remove any existing SVG to prevent duplicate rendering
    d3.select("#additional-graph-container svg").remove();

    const svg = d3.select("#additional-graph-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // Create scales
    const x = d3.scaleLinear()
      .domain([0, 1050])
      .range([0, width]);
  
    const y = d3.scaleLinear()
      .domain([0, 1050])
      .range([height, 0]);
  
    // X-axis
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat("").tickSize(1))
    .style("color", "#e0e6ed");

    // X axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 20)
      .text("Total Entropy")
      .style("fill", "#e0e6ed")
      .style("font-size", "14px");
  
    // Y-axis
    svg.append("g")
    .call(d3.axisLeft(y).tickFormat("").tickSize(1))
    .style("color", "#e0e6ed");

    // Y axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .text("Entropy Efficiency")
      .style("fill", "#e0e6ed")
      .style("font-size", "14px");
  
    // Add a title
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .text("Entropy Production vs Efficiency Across Universal Systems")
      .style("fill", "#e0e6ed")
      .style("font-size", "16px")
      .style("font-weight", "bold");
  
    // Create labels group
    const labelsGroup = svg.append("g")
      .attr("class", "labels");

    // Create nodes group
    const nodesGroup = svg.append("g")
      .attr("class", "nodes");

    // Variable to track current selected node
    let currentSelectedNode = null;

    // Add labels for all nodes (dimmed)
    const labels = labelsGroup.selectAll("text")
      .data(scatterData)
      .enter()
      .append("text")
      .text(d => d.name)
      .attr("x", d => x(d.actualEntropy))
      .attr("y", d => y(d.efficiency) - 20)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "#e0e6ed")
      .style("fill-opacity", 1);

    // Add points
    const nodes = nodesGroup.selectAll("dot")
      .data(scatterData)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.actualEntropy))
      .attr("cy", d => y(d.efficiency))
      .attr("r", 6)
      .style("fill", d => themeColors[d.category])
      .style("opacity", 0.8)
      .style("cursor", "pointer")
      // Modify the click event handler
    .on("click", function(event, clickedNode) {
        // If clicking the same node, unselect
        if (currentSelectedNode === clickedNode) {
            // Reset all nodes
            nodes
                .attr("r", 6)
                .style("fill-opacity", 0.8)
                .style("stroke", "none");
            
            // Reset labels
            labels
                .attr("font-size", 10)
                .style("fill-opacity", 1);
            
            currentSelectedNode = null;
            return;
        }

        // Reset all nodes
        nodes
            .attr("r", 6)
            .style("fill-opacity", 0.3)
            .style("stroke", "none");
        
        // Reset labels
        labels
            .attr("font-size", 10)
            .style("fill-opacity", 0.1);
        
        // Highlight clicked node
        d3.select(this)
            .attr("r", 10)
            .style("fill-opacity", 1)
            .style("stroke", "white")
            .style("stroke-width", 2);
        
        // Highlight label for clicked node
        labels
            .filter(d => d === clickedNode)
            .attr("font-size", 10)
            .style("fill-opacity", 1);
        
        currentSelectedNode = clickedNode;
    });
  
    // Add reference lines
    svg.append("line")
      .attr("x1", x(0))
      .attr("y1", y(0))
      .attr("x2", x(1000))
      .attr("y2", y(1000))
      .style("stroke", "#e0e6ed")
      .style("stroke-dasharray", "5,5")
      .style("stroke-width", 1)
      .style("opacity", 0.5);
  
  
    // Add quadrant labels
    const quadrantLabels = [
      { x: width * 0.25, y: height * 0.25, text: "Low Entropy / High Efficiency" },
      { x: width * 0.75, y: height * 0.25, text: "High Entropy / High Efficiency" },
      { x: width * 0.25, y: height * 0.75, text: "Low Entropy / Low Efficiency" },
      { x: width * 0.75, y: height * 0.75, text: "High Entropy / Low Efficiency" }
    ];
  
    svg.selectAll(".quadrant-label")
      .data(quadrantLabels)
      .enter()
      .append("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .text(d => d.text)
      .style("fill", "#e0e6ed")
      .style("opacity", 0.5)
      .style("font-size", "10px")
      .style("font-style", "italic");
  
    // Modified filter function for quantum and atomic combined
    function filterByTheme(theme) {
      if (theme === 'all') {
        nodes
          .transition()
          .duration(500)
          .style("opacity", 0.8);
      } else if (theme === 'quantum' || theme === 'atomic') {
        nodes
          .transition()
          .duration(500)
          .style("opacity", d => (d.category === 'quantum' || d.category === 'atomic') ? 0.8 : 0.1);
      } else {
        nodes
          .transition()
          .duration(500)
          .style("opacity", d => d.category === theme ? 0.8 : 0.1);
      }
    }
  
    // Connect theme buttons to filter function
    document.querySelectorAll('.theme-filter').forEach(button => {
      button.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        filterByTheme(theme);
      });
    });
  }
  
  // Create the scatter plot when the page loads
  document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure the container is fully rendered
    setTimeout(createEntropyScatterPlot, 500);
  });