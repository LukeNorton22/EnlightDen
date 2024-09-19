import React, { useState} from 'react';
import { Button, Icon, Container, Grid, Segment, Modal, Form, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

interface Note {
  id: string;
  mapId: string;
  title: string;
  content: string;
}


const NotesPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample notes with associated mind maps
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      mapId: '75f78843-24e7-4651-84e8-f45c09811aa3',
      title: 'Biology',
      content: 'Origin of life theories and other topics in biology.',
    },
    {
      id: '2',
      mapId: '85f78843-24e7-4651-84e8-f45c09811aa4',
      title: 'History',
      content: 'The Renaissance: A cultural movement that began in Italy and spread throughout Europe.',
    },
  ]);
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const newNote: Note = {
      id: (notes.length + 1).toString(),
      mapId: (notes.length + 1).toString(),  // Generate a new mapId for the uploaded file
      title: selectedFile.name,
      content: 'This is the content of the uploaded file.',
    };

    setNotes([...notes, newNote]);
    setSelectedFile(null); // Clear file input after upload
  };

  const viewNote = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true); // Open modal when a note is selected
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null); // Clear selected note on modal close
  };

  const openMindMap = (note: Note) => {
    navigate(`/mindmap/${note.mapId}`, { state: { noteId: note.id } });
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
