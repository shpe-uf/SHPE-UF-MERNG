import React, { useContext, useState } from "react";
import { Menu, Container, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "shpe uf" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const menuBar = (
    <Menu inverted>
      <Container>
        <Menu.Item
          className="brand"
          name="shpe uf"
          active={activeItem === "shpe uf"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          {user ? (
            <>
              <Menu.Item name="logout" onClick={logout} />
              <Dropdown item className="username" text={user.username}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/admin">
                    Admin Tools
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/points">
                    Points System
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Menu.Item
                name="register"
                active={activeItem === "register"}
                onClick={handleItemClick}
                as={Link}
                to="/register"
              />
              <Menu.Item
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
                as={Link}
                to="/login"
              />
            </>
          )}
        </Menu.Menu>
        {/*
        <Menu.Item
          name="about us"
          active={activeItem === "about us"}
          onClick={handleItemClick}
          as={Link}
          to="/about"
        />
        <Menu.Item
          name="e-board"
          active={activeItem === "e-board"}
          onClick={handleItemClick}
          as={Link}
          to="/eboard"
        />
        <Menu.Item
          name="dev team"
          active={activeItem === "dev team"}
          onClick={handleItemClick}
          as={Link}
          to="/devteam"
        />
        <Menu.Item
          name="sponsors"
          active={activeItem === "sponsors"}
          onClick={handleItemClick}
          as={Link}
          to="/sponsors"
        />
      </Container>
    </Menu>
  ) : (
    <Menu inverted>
      <Container>
        <Menu.Item
          className="brand"
          name="shpe uf"
          active={activeItem === "shpe uf"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="about us"
          active={activeItem === "about us"}
          onClick={handleItemClick}
          as={Link}
          to="/about"
        />
        <Menu.Item
          name="e-board"
          active={activeItem === "e-board"}
          onClick={handleItemClick}
          as={Link}
          to="/eboard"
        />
        <Menu.Item
          name="dev team"
          active={activeItem === "dev team"}
          onClick={handleItemClick}
          as={Link}
          to="/devteam"
        />
        <Menu.Item
          name="sponsors"
          active={activeItem === "sponsors"}
          onClick={handleItemClick}
          as={Link}
          to="/sponsors"
        />
        */}
      </Container>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
