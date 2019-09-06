import React, { useContext, useState } from "react";
import { Menu, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "SHPE UF" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu inverted>
      <Container>
        <Menu.Item name={user.username} active as={Link} to="/" />
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={logout} />
        </Menu.Menu>
      </Container>
    </Menu>
  ) : (
    <Menu inverted>
      <Container>
        <Menu.Item
          className="brand"
          name="SHPE UF"
          active={activeItem === "SHPE UF"}
          onClick={handleItemClick}
          as={Link}
          to="/"
          color="accent-1"
        />
        <Menu.Item
          name="about us"
          active={activeItem === "about us"}
          onClick={handleItemClick}
          as={Link}
          to="/about"
          color="accent-2"
        />
        <Menu.Item
          name="E-Board"
          active={activeItem === "E-Board"}
          onClick={handleItemClick}
          as={Link}
          to="/eboard"
          color="accent-2"
        />
        <Menu.Item
          name="sponsors"
          active={activeItem === "sponsors"}
          onClick={handleItemClick}
          as={Link}
          to="/sponsors"
          color="accent-2"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
            color="accent-2"
          />
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
            color="accent-2"
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
