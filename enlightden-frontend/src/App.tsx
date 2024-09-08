// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import NotesPage from './pages/NotesPage/NotesPage';
import MindMapPage from './pages/MindMapPage/MindMapPage';
import Navbar from './components/Navbar'; // Import the Navbar component

const App: React.FC = () => {
  const getMindMapData = (noteId: string) => {
    return {
      nodes: [
        { id: 1, label: 'Main Topic' },
        { id: 2, label: 'Subtopic 1' },
        { id: 3, label: 'Subtopic 2' },
      ],
      edges: [
        { id: 1, from: 1, to: 2 },
        { id: 2, from: 1, to: 3 },
      ],
    };
  };

  return (
    <Router>
      {/* Add the Navbar here so it appears on every page */}
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/mindmap/:noteId" element={<MindMapPage getMindMapData={getMindMapData} />} />
      </Routes>
    </Router>
  );
};

export default App;
