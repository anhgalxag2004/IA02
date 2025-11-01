import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchPhoto = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://picsum.photos/id/${id}/info`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (!cancelled) setPhoto(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPhoto();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div>
      <Link to="/photos" className="btn btn-link mb-3">
        ← Back to Photos
      </Link>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {photo && (
        <div className="card">
          <img
            src={photo.download_url}
            alt={photo.author}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
          <div className="card-body">
            <h3 className="card-title">
              {photo.id ? `Photo #${photo.id}` : "Untitled Photo"}
            </h3>
            <h5 className="text-muted">By {photo.author}</h5>
            <p className="mt-3">
              {/* Picsum doesn't provide a description: show placeholder */}
              No description available.
            </p>
            <p className="text-muted small">
              Original size: {photo.width}×{photo.height}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
