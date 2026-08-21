import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShowDetails } from "../services/api";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, [id]);

  function fetchDetails() {
    setLoading(true);
    setError(null);

    getShowDetails(id)
      .then((data) => setShow(data))
      .catch(() => setError("حصلت مشكلة في تحميل البيانات."))
      .finally(() => setLoading(false));
  }

  if (loading) return <p className="loading-text">Loading...</p>;

  if (error) {
    return (
      <div className="error-box">
        <p>{error}</p>
        <button onClick={fetchDetails}>Try Again</button>
      </div>
    );
  }

  if (!show) return null;

  const poster =
    show.image?.original ||
    show.image?.medium ||
    "https://via.placeholder.com/300x450?text=No+Image";

  const genres = show.genres?.length ? show.genres.join(", ") : "Unknown";
  const rating = show.rating?.average ?? "N/A";
  const cast = show._embedded?.cast ?? [];

  return (
    <main className="details-page">
      <button onClick={() => navigate(-1)} className="back-link">
        ← Back
      </button>

      <div className="details-hero">
        <img src={poster} alt={show.name} className="details-poster" />

        <div className="details-info">
          <h1>{show.name}</h1>

          <div className="details-meta">
            <span>⭐ {rating}</span>
            <span>{genres}</span>
            {show.status && <span>{show.status}</span>}
            {show.premiered && <span>{show.premiered.slice(0, 4)}</span>}
            {show.runtime && <span>{show.runtime} min</span>}
          </div>

          {show.network?.name && (
            <p className="details-network">📺 {show.network.name}</p>
          )}

          <div
            className="details-summary"
            dangerouslySetInnerHTML={{
              __html: show.summary || "No summary available.",
            }}
          />
        </div>
      </div>

      {cast.length > 0 && (
        <section className="details-cast">
          <h2>Cast</h2>

          <div className="cast-grid">
            {cast.slice(0, 12).map((member) => (
              <div key={member.person.id} className="cast-card">
                <img
                  src={
                    member.person.image?.medium ||
                    "https://via.placeholder.com/150x150?text=No+Image"
                  }
                  alt={member.person.name}
                />
                <p className="cast-name">{member.person.name}</p>
                <p className="cast-role">{member.character.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Details;