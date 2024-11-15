// src/pages/StudyModulePage/StudyModulePage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Header, Accordion, Icon, Message } from "semantic-ui-react";
import apiClient from "../../../src/apiClient";

interface Subtopic {
  id: string;
  title: string;
  content: string;
}

interface StudyModule {
  id: string;
  mainTopic: string;
  subtopics: Subtopic[];
}

const StudyModulePage: React.FC = () => {
  const { studyModuleId } = useParams<{ studyModuleId: string }>();
  const [studyModule, setStudyModule] = useState<StudyModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudyModule = async () => {
      try {
        const response = await apiClient.get(
          `/api/StudyTool/GetStudyModule/${studyModuleId}`
        );
        if (response.status === 200) {
          setStudyModule(response.data);
        } else {
          setErrorMessage("Failed to load study module.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching study module data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudyModule();
  }, [studyModuleId]);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return <Message>Loading...</Message>;
  }

  if (errorMessage) {
    return <Message negative>{errorMessage}</Message>;
  }

  return (
    <Container>
      <Header as="h1">{studyModule?.mainTopic}</Header>
      <Accordion styled fluid>
        {studyModule?.subtopics.map((subtopic, index) => (
          <div key={subtopic.id}>
            <Accordion.Title
              active={activeIndex === index}
              index={index}
              onClick={() => handleAccordionClick(index)}
            >
              <Icon name="dropdown" />
              {subtopic.title}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
              <p>{subtopic.content}</p>
            </Accordion.Content>
          </div>
        ))}
      </Accordion>
    </Container>
  );
};

export default StudyModulePage;
