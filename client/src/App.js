import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import UserRoute from "./util/UserRoute";

import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DevTeam from "./pages/DevTeam";
import About from "./pages/About";
import EBoard from "./pages/EBoard";
import Sponsors from "./pages/Sponsors";
import Admin from "./pages/Admin";
import Points from "./pages/Points";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <main>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/about" component={About} />
          <Route exact path="/eboard" component={EBoard} />
          <Route exact path="/devteam" component={DevTeam} />
          <Route exact path="/sponsors" component={Sponsors} />
          <UserRoute exact path="/admin" component={Admin} />
          <UserRoute exact path="/profile" component={Profile} />
          <UserRoute exact path="/points" component={Points} />
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
