import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Network } from 'vis-network/standalone';
import { Header, Loader, Message, Container } from 'semantic-ui-react';
import apiClient from '../../../src/apiClient'; // Axios instance for API calls

interface MindMapTopic {
  topic: string;
}

interface MindMapData {
  id: string;
  name: string;
  topics: MindMapTopic[];
}

const MindMapPage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>(); // Get noteId from URL params
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null); // State for mind map data
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch mind map data by noteId
  useEffect(() => {
    const fetchMindMapData = async () => {
      try {
        const response = await apiClient.get(`/api/MindMap/GetMindMapByNoteId/${noteId}`);
        if (response.status === 200) {
          setMindMapData(response.data); // Set mind map data
        } else {
          setErrorMessage('Failed to load mind map.');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching mind map data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMindMapData();
  }, [noteId]);

  // Initialize and render mind map when data is available
  useEffect(() => {
    if (mindMapData) {
      const container = document.getElementById('mindmap')!;

      // Convert the mind map data into nodes and edges
      const { nodes, edges } = convertJsonToVisNetworkData(mindMapData);

      if (nodes && edges) {
        const options = {
          nodes: {
            shape: 'dot',
            size: 16,
            color: {
              background: '#00B5D8', // Cyan background for nodes
              border: '#FFFFFF', // White borders for nodes
            },
            font: {
              color: '#FFFFFF',
            },
          },
          edges: {
            color: '#00B5D8', // Cyan edges
            width: 2,
          },
          physics: {
            enabled: true, // Enable physics for a dynamic look
          },
        };
        new Network(container, { nodes, edges }, options);
      }
    }
  }, [mindMapData]);

  // Helper function to convert JSON data to vis-network nodes and edges
  const convertJsonToVisNetworkData = (data: MindMapData) => {
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

  if (loading) {
    return <Loader active inline="centered" content="Loading mind map..." />;
  }

  if (errorMessage) {
    return <Message negative>{errorMessage}</Message>;
  }

  return (
    <div style={{ backgroundColor: '#1E1E2E', minHeight: '100vh' }}>
      {/* Header Section */}
      <Container textAlign="center" style={{ paddingTop: '80px', paddingBottom: '20px' }}>
        <Header as="h1" style={{ color: '#FFFFFF' }}>
          Mind Map for: {mindMapData?.name}
        </Header>
      </Container>

      {/* Full-screen mind map container */}
      <div
        id="mindmap"
        style={{
          height: 'calc(100vh - 120px)', // Adjust for header height
          backgroundColor: '#2E2E3E',
          padding: '20px',
        }}
      ></div>
    </div>
  );
};

export default MindMapPage;
