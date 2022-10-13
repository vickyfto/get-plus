import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Articles from "../components/Articles";
import Home from "../components/Home";

const RoutesPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="articles" element={<Articles />} />
      {/* 404 page */}
      <Route path="*" element={"404"} />
    </Routes>
  );
};

export default RoutesPages;
