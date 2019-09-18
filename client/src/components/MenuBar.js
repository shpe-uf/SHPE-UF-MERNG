import React, { useContext, useState } from "react";
import { Menu, Container } from "semantic-ui-react";
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

  const menuBar = user ? (
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
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} />
          <Menu.Item
            name={user.username}
            onClick={handleItemClick}
            className="username"
          />
        </Menu.Menu>
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
        <Menu.Menu position="right">
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
        </Menu.Menu>
      </Container>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
