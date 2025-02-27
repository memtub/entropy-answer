class EntropyNode {
    constructor({
      id,
      name,
      entropyProduction,
      connections = [],
      description = '',
      theme = 'default'
    }) {
      this.id = id;
      this.name = name;
      this.entropyProduction = entropyProduction;
      this.connections = connections;
      this.description = description;
      this.theme = theme;
    }
  }
  
  class EntropyNetwork {
    constructor() {
      this.nodes = {};
    }
  
    addNode(nodeData) {
      const node = new EntropyNode(nodeData);
      this.nodes[node.id] = node;
      return node;
    }
  
    generateLinks() {
      const links = [];
      const processedConnections = new Set();

      Object.values(this.nodes).forEach(node => {
        node.connections.forEach(connectionId => {
          // Create a unique key for the connection to avoid duplicates
          const connectionKey = [node.id, connectionId].sort().join('-');
          
          // Only process if this exact connection hasn't been processed before
          if (!processedConnections.has(connectionKey)) {
            links.push({
              source: node.id,
              target: connectionId
            });
            
            // Add the reverse connection
            links.push({
              source: connectionId,
              target: node.id
            });

            // Mark this connection as processed
            processedConnections.add(connectionKey);
          }
        });
      });

      return links;
    }
  
    exportGraphData() {
      return {
        nodes: Object.values(this.nodes),
        links: this.generateLinks()
      };
    }
  }
  
  function createEntropyNetwork() {
    const network = new EntropyNetwork();
  
    // Quantum Processes
    network.addNode({
      id: 'quantum_vacuum_fluctuation',
      name: 'Quantum Vacuum',
      entropyProduction: 1e-20,
      connections: ['fundamental_forces','quark_formation'],
      description: 'Energy variations in quantum vacuum',
      theme: 'quantum'
    });
  
    network.addNode({
      id: 'fundamental_forces',
      name: 'Fundamental Forces',
      entropyProduction: 1e-15,
      connections: ['quark_formation'],
      description: 'Forces enabling particle formation',
      theme: 'quantum'
    });
  
    // Particle Formation
    network.addNode({
      id: 'quark_formation',
      name: 'Quarks',
      entropyProduction: 1e-15,
      connections: ['electrons', 'protons','neutrons'],
      description: 'Formation enabling complex particles',
      theme: 'quantum'
    });

    network.addNode({
        id: 'electrons',
        name: 'Electrons',
        entropyProduction: 1e-10,
        connections: ['first_atoms'],
        description: 'Electrons enabling atomic formation',
        theme: 'quantum'
    });

    network.addNode({
        id: 'protons',
        name: 'Protons',
        entropyProduction: 1e-10,
        connections: ['first_atoms'],
        description: 'Protons enabling atomic formation',
        theme: 'quantum'
    });

    network.addNode({
        id: 'neutrons',
        name: 'Neutrons',
        entropyProduction: 1e-10,
        connections: ['first_atoms'],
        description: 'Protons enabling atomic formation',
        theme: 'quantum'
    });
  
    // Atomic and Molecular Processes
    network.addNode({
      id: 'first_atoms',
      name: 'Atoms',
      entropyProduction: 1e-5,
      connections: ['molecular_bonding','fundamental_forces'],
      description: 'Atoms enabling molecular structures',
      theme: 'atomic'
    });
  
    network.addNode({
      id: 'molecular_bonding',
      name: 'Molecular Bonding',
      entropyProduction: 1e-2,
      connections: ['organic_molecule_formation','stellar_formation','red_giant'],
      description: 'Chemical bonds enabling organic complexity',
      theme: 'atomic'
    });
  
    // Biological Processes
    network.addNode({
      id: 'organic_molecule_formation',
      name: 'Organic Molecules',
      entropyProduction: 1e5,
      connections: ['cells'],
      description: 'Complex molecules enabling life',
      theme: 'biological'
    });
  
    network.addNode({
      id: 'cells',
      name: 'Cells',
      entropyProduction: 1e7,
      connections: ['animals','plant_system','fungi'],
      description: 'Highly efficient entropy production in small volume',
      theme: 'biological'
    });

    network.addNode({
        id: 'bacteria',
        name: 'Bacteria',
        entropyProduction: 1e7,
        connections: ['organic_molecule_formation'],
        description: 'Highly efficient entropy production in small volume',
        theme: 'biological'
    });

    network.addNode({
      id: 'animals',
      name: 'Water Animals',
      entropyProduction: 2e8,
      connections: [],
      description: 'Intelligent systems maximizing entropy production efficiency',
      theme: 'biological'
    });

    network.addNode({
        id: 'fungi',
        name: 'Fungi',
        entropyProduction: 2e8,
        connections: [],
        description: 'Intelligent systems maximizing entropy production efficiency',
        theme: 'biological'
    });

    network.addNode({
        id: 'plant_system',
        name: 'Plant System',
        entropyProduction: 2e8,
        connections: ['cells'],
        description: 'Photosynthetic entropy production through solar energy conversion',
        theme: 'biological'
    });

    // Primitive Life
    network.addNode({
      id: 'archaea',
      name: 'Archaea',
      entropyProduction: 5e9,
      connections: ['animals'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    network.addNode({
      id: 'insects',
      name: 'Insects',
      entropyProduction: 10e10,
      connections: ['animals'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    network.addNode({
      id: 'fish',
      name: 'Fish',
      entropyProduction: 10e10,
      connections: ['animals'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    network.addNode({
      id: 'reptiles',
      name: 'Reptiles',
      entropyProduction: 10e10,
      connections: ['animals'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    network.addNode({
      id: 'parasites',
      name: 'Multicell Parasites',
      entropyProduction: 10e10,
      connections: ['animals'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    network.addNode({
      id: 'mammals',
      name: 'Early Mammals',
      entropyProduction: 6e12,
      connections: ['fish'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    network.addNode({
      id: 'humans',
      name: 'Humans',
      entropyProduction: 1e15,
      connections: ['mammals'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    network.addNode({
      id: 'dogs',
      name: 'Dogs',
      entropyProduction: 1e15,
      connections: ['mammals'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    network.addNode({
      id: 'other_mammals',
      name: 'Other Mammals',
      entropyProduction: 1e15,
      connections: ['mammals'],
      description: 'Ancient single-celled organisms in extreme environments',
      theme: 'biological'
    });

    // Cosmic Processes
    network.addNode({
      id: 'stellar_formation',
      name: 'Medium Stars',
      entropyProduction: 1e2,
      connections: ['galaxy_formation'],
      description: 'Large scale but less efficient entropy production',
      theme: 'cosmic'
    });

    network.addNode({
        id: 'red_giant',
        name: 'Giant Stars',
        entropyProduction: 1e2,
        connections: ['galaxy_formation','blackhole','neutron_star'],
        description: 'Large scale but less efficient entropy production',
        theme: 'cosmic'
    });

    network.addNode({
        id: 'planets',
        name: 'Planets',
        entropyProduction: 10e3,
        connections: ['galaxy_formation','stellar_formation'],
        description: 'Large scale but less efficient entropy production',
        theme: 'cosmic'
    });
  
    network.addNode({
      id: 'galaxy_formation',
      name: 'Galaxy',
      entropyProduction: 10e4,
      connections: [],
      description: 'Vast but diffuse entropy production',
      theme: 'cosmic'
    });

    network.addNode({
        id: 'galaxy_cluster',
        name: 'Galaxy Cluster',
        entropyProduction: 2e8,
        connections: ['galaxy_formation'],
        description: 'Vast but diffuse entropy production',
        theme: 'cosmic'
    });

    network.addNode({
        id: 'blackhole',
        name: 'Blackhole',
        entropyProduction: 1e70,
        connections: ['universal_heat_death'],
        description: 'Most efficient entropy producer per unit mass through Hawking radiation',
        theme: 'cosmic'
    });

    network.addNode({
        id: 'neutron_star',
        name: 'Neutron Star',
        entropyProduction: 1e70,
        connections: ['universal_heat_death'],
        description: 'Most efficient entropy producer per unit mass through Hawking radiation',
        theme: 'cosmic'
    });
    
    network.addNode({
        id: 'supermassive_blackhole',
        name: 'Supermassive Black Hole',
        entropyProduction: 1e84,
        connections: ['universal_heat_death'],
        description: 'Most efficient entropy producer per unit mass through Hawking radiation',
        theme: 'cosmic'
    });

    network.addNode({
        id: 'quazar',
        name: 'Pulsars',
        entropyProduction: 1e84,
        connections: ['universal_heat_death','neutron_star'],
        description: 'Most efficient entropy producer per unit mass through Hawking radiation',
        theme: 'cosmic'
    });
  
    network.addNode({
      id: 'universal_heat_death',
      name: 'Heat Death',
      entropyProduction: 1e91,
      connections: ['supermassive_blackhole'],
      description: 'Final maximum entropy state',
      theme: 'cosmic'
    });

    network.addNode({
        id: 'binary_black_hole',
        name: 'Binary Black Hole',
        entropyProduction: 1e78,
        connections: ['blackhole','supermassive_blackhole'],
        description: 'Orbiting black holes producing gravitational waves',
        theme: 'cosmic'
    });

    // Technology
    network.addNode({
        id: 'irrigation_system',
        name: 'Irrigation System',
        entropyProduction: 10e17,
        connections: ['humans'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'steam_engine',
        name: 'Steam Engine',
        entropyProduction: 10e17,
        connections: ['humans'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'windmill',
        name: 'Windmill',
        entropyProduction: 10e17,
        connections: ['humans'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'furnace',
        name: 'Furnace',
        entropyProduction: 10e17,
        connections: ['humans'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'mines',
        name: 'Mines',
        entropyProduction: 10e17,
        connections: ['humans'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'controlled_fire',
        name: 'Controlled Fire',
        entropyProduction: 10e17,
        connections: ['humans'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'forge',
        name: 'Forge',
        entropyProduction: 10e20,
        connections: ['steam_engine'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'canals',
        name: 'Canals',
        entropyProduction: 10e20,
        connections: ['irrigation_system'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'ships',
        name: 'Ships',
        entropyProduction: 10e20,
        connections: ['humans'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'trains',
        name: 'trains',
        entropyProduction: 10e20,
        connections: ['steam_engine'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'towns',
        name: 'Towns',
        entropyProduction: 10e20,
        connections: ['steam_engine','irrigation_system'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'machines',
        name: 'Machines',
        entropyProduction: 10e17,
        connections: ['humans'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'powerplants',
        name: 'powerplants',
        entropyProduction: 10e30,
        connections: ['towns','machines'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'factories',
        name: 'Factories',
        entropyProduction: 10e30,
        connections: ['towns','machines','powerplants'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'computer',
        name: 'Computer',
        entropyProduction: 10e30,
        connections: ['machines'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'cities',
        name: 'Cities',
        entropyProduction: 10e35,
        connections: ['towns','machines','powerplants'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'automobiles',
        name: 'Automobiles',
        entropyProduction: 10e35,
        connections: ['towns','machines','powerplants'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'skyscrapers',
        name: 'skyscrapers',
        entropyProduction: 10e30,
        connections: ['towns'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'airplanes',
        name: 'airplanes',
        entropyProduction: 10e35,
        connections: ['machines'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'airports',
        name: 'airports',
        entropyProduction: 10e35,
        connections: ['towns','machines','powerplants'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'rockets',
        name: 'rockets',
        entropyProduction: 10e35,
        connections: ['machines'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'sea_network',
        name: 'Sea Trade Network*',
        entropyProduction: 10e42,
        connections: ['cities','ships'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'land_network',
        name: 'Land Trade Network*',
        entropyProduction: 10e42,
        connections: ['cities','trains'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'nuclear_fission',
        name: 'Nuclear Fission',
        entropyProduction: 10e42,
        connections: ['machines','cities','powerplants','molecular_bonding'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'subway_transport',
        name: 'Subway Network',
        entropyProduction: 10e42,
        connections: ['machines','cities','powerplants','trains'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'satellite',
        name: 'Satellite Network',
        entropyProduction: 10e44,
        connections: ['machines','cities','rockets','satellite'],
        description: 'Water management for crops',
        theme: 'technology'
    });

    network.addNode({
        id: 'dwarf',
        name: 'Brown Dwarf',
        entropyProduction: 10e30,
        connections: ['molecular_bonding'],
        description: 'Water management for crops',
        theme: 'cosmic'
    });

    network.addNode({
        id: 'social_media',
        name: 'Social Media',
        entropyProduction: 450e49,
        connections: ['computer','satellite'],
        description: 'Water management for crops',
        theme: 'technology'
    });
  
    return network;
  }
