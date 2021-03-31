import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { UserContext } from '../context/Context'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, handleLogout } = useContext(UserContext)

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="gp-header" color="light" expand="md">
        <NavbarBrand className="nav-link" href="/">GP Booking</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" href="/booking">Book Appointment</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right className="dropdown">
                {isAuth ? <DropdownItem><NavLink onClick={handleLogout} href="/">Logout</NavLink></DropdownItem> :
                  <>
                    <DropdownItem><NavLink href="/login">Login</NavLink></DropdownItem>
                    <DropdownItem><NavLink href="/register">Register</NavLink></DropdownItem>
                  </>}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
