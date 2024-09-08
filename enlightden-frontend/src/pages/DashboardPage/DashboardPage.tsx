// src/pages/DashboardPage/DashboardPage.tsx
import React from 'react';
import { Button, Container, Header, Icon, Card } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate(); // Hook to access navigation

  const navigateToNotes = () => {
    // Logic to navigate to the Notes page
    navigate('/notes'); // Use navigate function to go to /notes
    console.log('Navigating to Notes Page');
  };

  const startNewStudySession = () => {
    // Logic to start a new study session
    navigate('/study-session'); // Use navigate function to go to /study-session
    console.log('Starting new study session');
  };

  // Placeholder data, replace with actual data fetching logic
  const latestNotes = {
    title: 'Latest Notes Title',
    description: 'This is a short description of the latest notes.'
  };

  const lastTestScore = {
    score: 85,
    date: '2024-09-01'
  };

  const studySchedule = {
    nextSession: 'Math - Differential Equations',
    time: '2024-09-06 14:00'
  };

  return (
    <Container>
      <Header as='h1'>Dashboard</Header>

      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Header>Latest Notes</Card.Header>
            <Card.Description>
              {latestNotes.title}: {latestNotes.description}
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Card.Header>Last Test Score</Card.Header>
            <Card.Description>
              Score: {lastTestScore.score} <br />
              Date: {lastTestScore.date}
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Card.Header>Study Schedule</Card.Header>
            <Card.Description>
              Next Session: {studySchedule.nextSession} <br />
              Time: {studySchedule.time}
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>

      <Button color='blue' onClick={navigateToNotes}>
        <Icon name='sticky note' /> Go to Notes
      </Button>
      <Button color='green' onClick={startNewStudySession}>
        <Icon name='play' /> Start Study Session
      </Button>
    </Container>
  );
};

export default DashboardPage;
