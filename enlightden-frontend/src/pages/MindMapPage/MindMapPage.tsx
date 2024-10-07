import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Network } from 'vis-network/standalone';
import { Header, Loader, Message, Container, Modal, Button, Input, Dimmer } from 'semantic-ui-react';
import apiClient from '../../../src/apiClient'; // Axios instance for API calls

interface MindMapTopic {
  id: string;
  topic: string;
}

interface MindMapData {
  id: string;
  name: string;
  noteId: string;
  classId: string;  
  topics: MindMapTopic[];
}

const MindMapPage: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>(); // Get noteId from URL params
  const navigate = useNavigate();
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null); // State for mind map data
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<MindMapTopic | null>(null); // Track selected topic
  const [modalOpen, setModalOpen] = useState(false); // Modal for test/flashcard generation options
  const [viewTestModalOpen, setViewTestModalOpen] = useState(false); // Separate modal for viewing test
  const [loadingTest, setLoadingTest] = useState(false); // Loading indicator for test generation
  const [testExists, setTestExists] = useState<boolean>(false); // Track if the test exists for the selected topic
  const [testId, setTestId] = useState<string | null>(null); // Track Test ID if it exists
  const [testName, setTestName] = useState<string>(''); // Track the name of the test

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
        const network = new Network(container, { nodes, edges }, options);

        // Handle click event on nodes (topics)
        network.on('click', function (params) {
          const nodeId = params.nodes[0];

          const topic = nodes.find((node) => node.id === nodeId);
          if (topic && topic.id) {
            setSelectedTopic({ id: topic.id, topic: topic.label });
            checkIfTestExists(topic.id); // Check if a test exists for this topic
          }
        });
      }
    }
  }, [mindMapData]);

  // Helper function to convert JSON data to vis-network nodes and edges
  const convertJsonToVisNetworkData = (data: MindMapData) => {
    const nodes: { id: string; label: string; size: number; color: string }[] = [];
    const edges: { from: string; to: string; weight: number }[] = [];

    const rootNodeId = data.id || 'root'; // Assign an ID for the root node
    const rootNode = { id: rootNodeId, label: data.name, size: 20, color: 'lightblue' };
    nodes.push(rootNode);

    data.topics.forEach((topic) => {
      const topicNode = { id: topic.id, label: topic.topic, size: 15, color: 'lightgreen' };
      nodes.push(topicNode);
      edges.push({ from: rootNodeId, to: topic.id, weight: 2 });
    });

    return { nodes, edges };
  };

  // Check if a test exists for the selected topic
  const checkIfTestExists = async (topicId: string) => {
    try {
      const response = await apiClient.get(`/api/StudyTool/CheckExistingTest/${topicId}`);
      const exists = response.data.testExists;
      setTestExists(exists);
      setTestId(response.data.testId); // Set the TestId for navigation later

      // Open either the view test modal or the test generation modal
      if (exists) {
        setViewTestModalOpen(true); // Open the modal for viewing an existing test
      } else {
        setModalOpen(true); // Open the modal for generating a new test
      }
    } catch (error) {
      console.log('Error checking if test exists:', error);
    }
  };

  // Handle test generation
  const generateTest = async () => {
    if (!selectedTopic || !testName) {
      setErrorMessage('Please provide the test name.');
      return;
    }

    setLoadingTest(true); // Show loading screen
    try {
      const response = await apiClient.post(`/api/StudyTool/GenerateTestFromTopic`, {
        classId: mindMapData?.classId,  // Use the classId from the mind map data
        mindMapId: mindMapData?.id,
        topicId: selectedTopic.id, // Pass the correct GUID for topicId
        name: testName, // Pass user-provided test name
        noteId: mindMapData?.noteId, // Pass the noteId
      });

      if (response.status === 200) {
        // Redirect to test page with the generated test ID
        navigate(`/test/${response.data.testId}`);
      } else {
        setErrorMessage('Failed to generate test.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while generating the test.');
    } finally {
      setLoadingTest(false);
      setModalOpen(false); // Close modal after generation
    }
  };

  // Handle view existing test
  const viewTest = () => {
    if (testId) {
      navigate(`/test/${testId}`); // Navigate to the test page using the TestId
    }
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

      {/* Modal for generating test */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} size="small" style={{ backgroundColor: '#2E2E3E', color: '#FFFFFF' }}>
        <Modal.Header style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }}>
          Generate Test for: {selectedTopic?.topic}
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#2E2E3E', color: '#FFFFFF' }}>
          <Input
            placeholder="Enter test name"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            style={{ marginBottom: '1em', backgroundColor: '#1E1E2E', color: '#FFFFFF' }}
          />
          <Button primary onClick={generateTest} style={{ backgroundColor: '#00B5D8', color: '#FFFFFF' }}>
            Generate Test
          </Button>
        </Modal.Content>
      </Modal>

      {/* Separate Modal for viewing test */}
      <Modal open={viewTestModalOpen} onClose={() => setViewTestModalOpen(false)} size="small" style={{ backgroundColor: '#2E2E3E', color: '#FFFFFF' }}>
        <Modal.Header style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }}>
          View Test for: {selectedTopic?.topic}
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#2E2E3E', color: '#FFFFFF' }}>
          <Button primary onClick={viewTest} style={{ marginBottom: '1em' }}>
            View Test
          </Button>
        </Modal.Content>
      </Modal>

      {/* Loading screen for test generation */}
      <Dimmer active={loadingTest} page>
        <Loader>Generating Test...</Loader>
      </Dimmer>
    </div>
  );
};

export default MindMapPage;
