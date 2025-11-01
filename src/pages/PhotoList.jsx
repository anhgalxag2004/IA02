import React, { useEffect, useState, useRef, useCallback } from "react";
import PhotoCard from "../components/PhotoCard";

const PAGE_LIMIT = 30;

export default function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef();
  const sentinelRef = useRef();

  const fetchPhotos = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=${PAGE_LIMIT}`
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((p) => [...p, ...data]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos(page);
  }, [page, fetchPhotos]);

  useEffect(() => {
    if (loading) return;
    if (!hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" }
    );

    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current && observerRef.current.disconnect();
  }, [loading, hasMore]);

  return (
    <div>
      <h1 className="mb-3">Photos</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {photos.map((photo) => (
          <div className="col" key={photo.id}>
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      <div className="text-center my-4">
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <div className="text-danger mt-2">{error}</div>}
        {!hasMore && (
          <div className="text-muted mt-2">No more photos to load.</div>
        )}
      </div>

      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
