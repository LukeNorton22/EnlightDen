import React, { useEffect } from 'react';
import { Network } from 'vis-network/standalone';
import { Header, Icon, Container } from 'semantic-ui-react';

interface MindMapPageProps {
  getMindMapData: (noteId: string) => { nodes: { id: string | number; label: string }[]; edges: { from: string | number; to: string | number }[] };
}

const MindMapPage: React.FC<MindMapPageProps> = ({ getMindMapData }) => {
  const mindMapJson = {
    id: "75f78843-24e7-4651-84e8-f45c09811aa3",
    name: "Biology", // This will be used as the header and root node label
    topics: [
      { topic: "- Genetic Variation" },
      { topic: "- Overview of Life’s Unity" },
      { topic: "- Biogenesis" },
      { topic: "- Diversity of Life" },
      { topic: "- Growth and Development" },
      { topic: "- Evolution" },
      { topic: "- Evolutionary View of Diversity" },
      { topic: "- Introduction to Biology" },
      { topic: "- Scientific Method" },
      { topic: "- Taxonomy" },
      { topic: "- Artificial Selection" },
      { topic: "- Reproduction" },
      { topic: "- Natural Selection" },
      { topic: "- Cell Theory" },
      { topic: "- Response to Stimuli" },
      { topic: "- Homeostasis" },
      { topic: "- Biodiversity" },
      { topic: "- Metabolism" },
      { topic: "- Biological Inquiry" },
      { topic: "- Adaptation" }
    ]
  };

  useEffect(() => {
    const container = document.getElementById('mindmap')!;

    // Convert the mind map JSON data into nodes and edges
    const { nodes, edges } = convertJsonToVisNetworkData(mindMapJson);

    if (nodes && edges) {
      const options = {
        nodes: {
          shape: 'dot',
          size: 16,
        },
        edges: {
          width: 2,
        },
      };
      new Network(container, { nodes, edges }, options);
    }
  }, [mindMapJson]); // Adding mindMapJson as a dependency

  //Check to see if the the is really getting from the id.

  // Helper function to convert JSON data to vis-network nodes and edges
  const convertJsonToVisNetworkData = (data: typeof mindMapJson) => {
    const nodes: { id: string; label: string; size: number; color: string }[] = [];
    const edges: { from: string; to: string; weight: number }[] = [];

    const rootNodeId = data.id || 'root'; // Assign an ID for the root node
    const rootNode = { id: rootNodeId, label: data.name, size: 20, color: 'lightblue' }; // Use data.name for the root label
    nodes.push(rootNode);

    data.topics.forEach((topic, index) => {
      const topicNodeId = `${rootNodeId}-${index}`; // Create unique IDs for each topic
      const topicNode = { id: topicNodeId, label: topic.topic, size: 15, color: 'lightgreen' };
      nodes.push(topicNode);
      edges.push({ from: rootNodeId, to: topicNodeId, weight: 2 });
    });

    return { nodes, edges };
  };

  return (
    <Container>
      {/* Prettier Header */}
      <Header as="h1" icon textAlign="center" style={{ marginTop: '20px' }}>
        <Icon name="sitemap" circular />
        <Header.Content>
          Mind Map for {mindMapJson.name}
        </Header.Content>
      </Header>

      <div id="mindmap" style={{ height: '500px', marginTop: '20px' }}></div>
    </Container>
  );
};

export default MindMapPage;
