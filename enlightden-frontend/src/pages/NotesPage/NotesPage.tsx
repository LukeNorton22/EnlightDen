import React, { useEffect, useState } from 'react';
import { Button, Icon, Container, Grid, Segment, Modal, Form, Input, Loader, Message, Dimmer, Header } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../../src/apiClient'; // Axios instance for API calls

interface Note {
  id: string;
  classId: string;
  title: string;
  content: string;
  filePath: string;
  hasMindMap: boolean; // Boolean to check mind map existence
}

const NotesPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>(); // Get classId from the URL params
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMindMap, setLoadingMindMap] = useState<boolean>(false); // Full-screen loader for mind map generation
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // Track selected note for modal content
  const [className, setClassName] = useState<string>(''); // Store the class name

  // Fetch class name and notes for the current class
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        // Fetch the class name by classId
        const classResponse = await apiClient.get(`/api/Class/${classId}`);
        if (classResponse.status === 200) {
          setClassName(classResponse.data.name); // Set the class name
        }

        // Fetch the notes for the class
        const notesResponse = await apiClient.get(`/api/Notes/GetByClassId/${classId}`);
        if (notesResponse.status === 200) {
          setNotes(Array.isArray(notesResponse.data) ? notesResponse.data : []);
        } else {
          setErrorMessage('Failed to load notes.');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId]);

  // Open modal to create a new note
  const openNoteModal = () => {
    setIsNoteModalOpen(true);
  };

  // Close modal after note creation
  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
    setNewNoteTitle('');
    setSelectedFile(null);
  };

  // Handle file selection for note creation
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Handle note creation by uploading a file
  const handleUpload = async () => {
    if (!selectedFile || !newNoteTitle) {
      setErrorMessage('Please provide a valid file and title for the note.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('classId', classId!); // Append classId from URL params
    formData.append('title', newNoteTitle);

    try {
      const response = await apiClient.post('/api/Notes/Create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        const newNote: Note = response.data;
        setNotes([...notes, newNote]);
        closeNoteModal(); // Close the modal after upload
      } else {
        setErrorMessage('Failed to upload the note.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while uploading the note.');
    }
  };

  // Call API to generate mind map for the given noteId
  const generateMindMap = async (noteId: string) => {
    try {
      setLoadingMindMap(true); // Show full-screen loader while generating mind map
      const response = await apiClient.post(`/api/MindMap/CreateMindMapFromNote/${noteId}`);

      if (response.status === 200) {
        // Navigate to the MindMapPage after the mind map is generated
        navigate(`/mindmap/${noteId}`);
      } else {
        setErrorMessage('Failed to generate mind map.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while generating the mind map.');
    } finally {
      setLoadingMindMap(false); // Hide the loader after the operation
    }
  };

  // Navigate to view the existing mind map
  const viewMindMap = (noteId: string) => {
    navigate(`/mindmap/${noteId}`);
  };

  // Open modal to view the selected note content
  const openNoteContentModal = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  // Close the note content modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <Container style={{ paddingTop: '90px' }}> {/* Fixes navbar overlap */}
      <h1>Notes for Class: {className}</h1> {/* Display class name instead of ID */}

      {errorMessage && <Message negative>{errorMessage}</Message>}

      {/* Button to upload a note */}
      <Button
        circular
        icon="plus"
        size="massive"
        color="green"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
        onClick={openNoteModal}
      />

      {/* Modal for uploading notes */}
      <Modal
        open={isNoteModalOpen}
        onClose={closeNoteModal}
        closeIcon
        style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }} // Dark theme modal
      >
        <Modal.Header style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }}>
          Create a New Note
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }}>
          <Form>
            <Form.Field>
              <label style={{ color: '#FFFFFF' }}>Note Title</label> {/* Fix input label color */}
              <Input
                placeholder="Enter note title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                style={{ backgroundColor: '#2E2E3E', color: '#FFFFFF' }} // Dark input fields
              />
            </Form.Field>
            <Form.Field>
              <label style={{ color: '#FFFFFF' }}>Upload PDF</label> {/* Fix input label color */}
              <Input
                type="file"
                onChange={handleFileChange}
                style={{ backgroundColor: '#2E2E3E', color: '#FFFFFF' }} // Dark input fields
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }}>
          <Button onClick={closeNoteModal} color="red">
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            primary
            style={{ transition: 'background-color 0.3s' }} // Hover transition for submit button
          >
            Submit
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Display notes in list view */}
      {notes.length > 0 ? (
        <Segment.Group>
          {notes.map((note) => (
            <Segment
              key={note.id}
              className="note-segment" // Apply class for hover effect
              style={{
                backgroundColor: '#2E2E3E',
                padding: '1.5em',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                marginBottom: '1em',
                position: 'relative',
              }}
              onClick={() => openNoteContentModal(note)} // Clicking the card opens the modal with note content
            >
              <Grid>
                <Grid.Column width={12}>
                  <Header as="h3" style={{ color: '#FFFFFF' }}>{note.title}</Header>
                </Grid.Column>

                <Grid.Column width={4} textAlign="right">
                  {/* Conditional button for generating or viewing mind map */}
                  {note.hasMindMap ? (
                    <Button
                      primary
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent modal from opening when the button is clicked
                        viewMindMap(note.id);
                      }}
                      className="hover-scale"
                    >
                      View Mind Map
                    </Button>
                  ) : (
                    <Button
                      primary
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent modal from opening when the button is clicked
                        generateMindMap(note.id);
                      }}
                      className="hover-scale"
                    >
                      Generate Mind Map
                    </Button>
                  )}
                </Grid.Column>
              </Grid>
            </Segment>
          ))}
        </Segment.Group>
      ) : (
        <Message info>
          <Message.Header>No notes found for this class.</Message.Header>
          <p>Create a new note to get started.</p>
        </Message>
      )}

      {/* Full-screen loader for mind map generation */}
      <Dimmer active={loadingMindMap} page>
        <Loader>Generating Mind Map...</Loader>
      </Dimmer>

      {/* Modal to display the content of the selected note */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        closeIcon
        style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }} // Dark theme modal for viewing notes
      >
        <Modal.Header style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }}>
          {selectedNote?.title}
        </Modal.Header>
        <Modal.Content style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }}>
          <p>{selectedNote?.content}</p>
        </Modal.Content>
        <Modal.Actions style={{ backgroundColor: '#1E1E2E', color: '#FFFFFF' }}>
          <Button onClick={closeModal} color="red">
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default NotesPage;
