import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Layout from "features/layout";
import Home from "features/home/Loadable";
import Explore from "features/explore/Loadable";
import Message from "features/message/Loadable";
import Mine from "features/mine/Loadable";

import Sign from "features/sign/Loadable";

function App() {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="message" element={<Message />} />
          <Route path="mine" element={<Mine />} />
        </Route>
        <Route path="sign" element={<Sign />} />
      </Routes>
    </Container>
  );
}

export default App;
