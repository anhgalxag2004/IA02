import React from "react";
import { Link } from "react-router-dom";

export default function PhotoCard({ photo }) {
  // Use a small thumbnail size to keep layout snappy
  const thumbUrl = `https://picsum.photos/id/${photo.id}/400/250`;

  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/photos/${photo.id}`} className="stretched-link">
        <img
          src={thumbUrl}
          className="card-img-top"
          alt={photo.author}
          style={{ objectFit: "cover", height: 180 }}
        />
      </Link>
      <div className="card-body">
        <h6 className="card-title mb-1">By {photo.author}</h6>
        <p className="card-text text-muted small">ID: {photo.id}</p>
      </div>
    </div>
  );
}
