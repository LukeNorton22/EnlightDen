import React, { useState, useEffect } from 'react';
import { Button, Icon, Container, Grid, Segment, Modal, Form, Input } from 'semantic-ui-react'; // Remove 'Card' from here
import { useNavigate } from 'react-router-dom';


interface Note {
  id: string;
  title: string;
  content: string;
}

interface Node {
  id: number;
  label: string;
}

interface Edge {
  id: number;
  from: number;
  to: number;
}

const NotesPage: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Sociology',
      content: 'Socialization: Process by which individuals learn and internalize the values, beliefs, and norms of their culture. Key agents include family, school, peers, and media.',
    },
    {
      id: '2',
      title: 'History',
      content: 'The Renaissance (14th-17th Century): A cultural movement that began in Italy and spread throughout Europe.',
    },
  ]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [mindMapData, setMindMapData] = useState<{ nodes: Node[]; edges: Edge[] }>({ nodes: [], edges: [] });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Generate mind map data based on notes
    const generateMindMapData = (notes: Note[]) => {
      const nodes = notes.map((note, index) => ({
        id: index + 1,
        label: note.title,
      }));

      // Example: Create edges between related topics
      const edges = notes.length > 1 ? [{ id: 1, from: 1, to: 2 }] : [];

      return { nodes, edges };
    };

    const mindMap = generateMindMapData(notes);
    setMindMapData(mindMap);
  }, [notes]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    // For simplicity, we just add the file as a new note.
    // In a real app, you'd probably send it to a backend and process it there.
    const newNote: Note = {
      id: (notes.length + 1).toString(),
      title: selectedFile.name,
      content: 'This is the content of the uploaded file.',
    };

    setNotes([...notes, newNote]);
    setSelectedFile(null); // Clear the file input after upload
  };

  const viewNote = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true); // Open the modal when a note is selected
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null); // Clear the selected note when the modal is closed
  };

  const openMindMap = (note: Note) => {
    navigate('/mindmap', { state: { mindMapData, noteId: note.id } });
  };

  return (
    <Container>
      <h1>Notes</h1>

      {/* Upload Form */}
      <Form>
        <Form.Field>
          <Input type="file" onChange={handleFileChange} />
        </Form.Field>
        <Button onClick={handleUpload} primary>
          Upload Note
        </Button>
      </Form>

      {/* Display Notes */}
      <Segment>
        <Grid columns={3} doubling stackable>
          {notes.map((note) => (
            <Grid.Column key={note.id}>
              <Segment>
                <Icon name="file alternate outline" size="huge" />
                <h4>{note.title}</h4>
                <Button onClick={() => viewNote(note)} color="blue" size="tiny">
                  <Icon name="eye" /> View
                </Button>
                <Button onClick={() => openMindMap(note)} primary size="tiny">
                  <Icon name="map" /> Open Mind Map
                </Button>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      </Segment>

      {/* Note Content Modal */}
      <Modal open={isModalOpen} onClose={closeModal} closeIcon>
        <Modal.Header>{selectedNote?.title}</Modal.Header>
        <Modal.Content>
          <p>{selectedNote?.content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal} color="red">
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default NotesPage;
