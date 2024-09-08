import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Network } from 'vis-network/standalone';

interface MindMapPageProps {
  getMindMapData: (noteId: string) => { nodes: any[]; edges: any[] };
}

interface LocationState {
  mindMapData: { nodes: any[]; edges: any[] };
  noteId: string;
}

const MindMapPage: React.FC<MindMapPageProps> = ({ getMindMapData }) => {
  const location = useLocation(); // Remove type arguments
  const state = location.state as LocationState; // Type assertion

  useEffect(() => {
    const container = document.getElementById('mindmap')!;
    const data = state?.mindMapData || getMindMapData(state?.noteId);

    if (data) {
      const options = {
        nodes: {
          shape: 'dot',
          size: 16,
        },
        edges: {
          width: 2,
        },
      };
      new Network(container, data, options);
    }
  }, [state, getMindMapData]);

  return (
    <div>
      <h1>Mind Map for Note ID: {state?.noteId}</h1>
      <div id="mindmap" style={{ height: '500px' }}></div>
    </div>
  );
};

export default MindMapPage;
