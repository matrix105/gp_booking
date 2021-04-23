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
  const { handleLogout } = useContext(UserContext)

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="gp-header" color="light" expand="md">
        <NavbarBrand className="nav-link" href="/">GP Clinic</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            {localStorage.getItem('role') === '3' ?
              <NavItem>
                <NavLink className="nav-link" href="/dashboard">Dashboard</NavLink>
              </NavItem> :
              null}
            <NavItem>
              <NavLink className="nav-link" href="/appointments">Appointments</NavLink>
            </NavItem>
            {localStorage.getItem('role') === '4' ?
              <NavItem>
                <NavLink className="nav-link" href="/prescription">Prescription</NavLink>
              </NavItem>
              :
              null
            }
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right className="dropdown">
                {localStorage.getItem('token') != null ?
                  <>
                    <DropdownItem><NavLink href="/edit">Edit Details</NavLink></DropdownItem>
                    <DropdownItem><NavLink onClick={handleLogout} href="/">Logout</NavLink></DropdownItem>
                  </>
                  :
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
