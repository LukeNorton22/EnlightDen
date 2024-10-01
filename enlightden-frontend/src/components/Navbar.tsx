// NavBar.tsx
import React from 'react';
import { Menu, Container, Icon } from 'semantic-ui-react';

const NavBar: React.FC = () => {
  return (
    <Menu inverted fixed="top" style={{ backgroundColor: '#2E2E3E', height: '60px', border: 'none' }}>
      <Container>
        <Menu.Item header style={{ color: '#00B5D8', fontSize: '1.5em' }}>
          <Icon name="graduation" />
          EnlightDen
        </Menu.Item>
        <Menu.Item position="right" style={{ color: '#B0B0B0' }}>
          <Icon name="user" />
          Profile
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
