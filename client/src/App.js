import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import DevTeam from "./pages/DevTeam";
import About from "./pages/About";
import EBoard from "./pages/EBoard";
import Sponsors from "./pages/Sponsors";
import Points from "./pages/Points";

function App() {

  console.log("Hello World!");
  
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <main>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/about" component={About} />
          <Route exact path="/eboard" component={EBoard} />
          <Route exact path="/sponsors" component={Sponsors} />
          <Route exact path="/devteam" component={DevTeam} />
          <Route exact path="/points" component={Points} />
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
