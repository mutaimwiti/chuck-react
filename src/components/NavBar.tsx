import React from 'react';
import { Navbar } from 'react-bootstrap';

type NavBarProps = {
  onGoHome(): void;
};

const NavBar: React.FC<NavBarProps> = ({ onGoHome }) => {
  return <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#" onClick={() => onGoHome()}>
        Chuck React
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
}

export default NavBar
