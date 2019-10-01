import React, { useContext, useState } from "react";
import {
  Menu,
  Container,
  Dropdown,
  Responsive,
  Icon,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "shpe uf" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const onToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      <Responsive minWidth={992}>
        <Menu inverted>
          <Container>
            <Menu.Item
              className="brand"
              name="shpe uf"
              active={activeItem === "shpe uf"}
              onClick={handleItemClick}
              as={Link}
              to="/"
            >
              SHPE UF
            </Menu.Item>

            <Menu.Item
              name="about us"
              active={activeItem === "about us"}
              onClick={handleItemClick}
              as={Link}
              to="/about"
            >
              About Us
            </Menu.Item>

            <Menu.Item
              name="e-board"
              active={activeItem === "e-board"}
              onClick={handleItemClick}
              as={Link}
              to="/eboard"
            >
              E-Board
            </Menu.Item>

            <Menu.Item
              name="dev team"
              active={activeItem === "dev team"}
              onClick={handleItemClick}
              as={Link}
              to="/devteam"
            >
              Dev Team
            </Menu.Item>

            <Menu.Item
              name="sponsors"
              active={activeItem === "sponsors"}
              onClick={handleItemClick}
              as={Link}
              to="/sponsors"
            >
              Sponsors
            </Menu.Item>

            <Menu.Menu position="right">
              {user ? (
                <>
                  <Dropdown pointing item className="email" text={user.email}>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/admin">
                        Admin Tools
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/profile">
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/points">
                        Points System
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logout}>
                        <p className="logout">Logout</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Menu.Item>
                  <Button name="login" as={Link} to="/login">
                    Members
                  </Button>
                </Menu.Item>
              )}
            </Menu.Menu>
          </Container>
        </Menu>
      </Responsive>

      <Responsive maxWidth={991}>
        <Menu inverted>
          <Container>
            <Menu.Item
              className="brand"
              name="shpe uf"
              active={activeItem === "shpe uf"}
              onClick={handleItemClick}
              as={Link}
              to="/"
            >
              HOME
            </Menu.Item>

            <Menu.Menu position="right">
              {user ? (
                <>
                  <Dropdown pointing item className="email" text={user.email}>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/admin">
                        Admin Tools
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/profile">
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/points">
                        Points System
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logout}>
                        <p className="logout">Logout</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Menu.Item>
                  <Button name="login" as={Link} to="/login">
                    Members
                  </Button>
                </Menu.Item>
              )}
            </Menu.Menu>
          </Container>
        </Menu>
      </Responsive>
    </>
  );
}

export default MenuBar;
