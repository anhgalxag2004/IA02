import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import PhotoList from "./pages/PhotoList";
import PhotoDetail from "./pages/PhotoDetail";

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/photos">
            Picsum Browser
          </Link>
        </div>
      </nav>

      <div className="container mb-5">
        <Routes>
          <Route path="/" element={<Navigate to="/photos" replace />} />
          <Route path="/photos" element={<PhotoList />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </div>
    </div>
  );
}
