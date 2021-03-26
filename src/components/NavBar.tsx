import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {CategoriesState} from "../store/reducers/categories";

type NavBarProps = {
    categories: CategoriesState,
    onSelectCategory(category: string): void,
}

const NavBar: React.FC<NavBarProps> = ({categories, onSelectCategory}) => {
    return <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#" onClick={() => onSelectCategory('')}>
            Chuck React
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <NavDropdown title="Categories" id="basic-nav-dropdown">
                    {categories.map((category: string) => (
                        <NavDropdown.Item key={category} onClick={() => onSelectCategory(category)}>
                            {category}
                        </NavDropdown.Item>
                    ))}
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
};

export default NavBar;
