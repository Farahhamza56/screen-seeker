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
      .catch(() =>
        setError("There was a problem loading this show.")
      )
      .finally(() => setLoading(false));
  }

  if (loading) {
    return (
      <main className="details-page">
        <div className="details-loading">
          <div className="loading-spinner" />
          <p>Loading show details...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="details-page">
        <div className="error-box">
          <p>{error}</p>

          <button onClick={fetchDetails}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!show) {
    return null;
  }

  const poster =
    show.image?.original ||
    show.image?.medium ||
    "https://via.placeholder.com/600x900?text=No+Image";

  const rating = show.rating?.average ?? "N/A";

  const genres = show.genres?.length
    ? show.genres
    : ["Unknown"];

  const cast = show._embedded?.cast ?? [];

  return (
    <main className="details-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <span>←</span>
        Back
      </button>

      <section className="details-hero">
        <div className="details-poster-column">
          <div className="details-poster-wrapper">
            <img
              src={poster}
              alt={show.name}
              className="details-poster"
            />
          </div>
        </div>

        <div className="details-info">
          <p className="details-eyebrow">
            SHOW DETAILS
          </p>

          <h1>{show.name}</h1>

          <div className="details-rating">
            <span className="star">★</span>
            <strong>{rating}</strong>

            {rating !== "N/A" && (
              <span className="rating-label">
                Rating
              </span>
            )}
          </div>

          <div className="details-meta">
            {genres.map((genre) => (
              <span
                key={genre}
                className="details-genre"
              >
                {genre}
              </span>
            ))}

            {show.status && (
              <span className="details-meta-item">
                {show.status}
              </span>
            )}

            {show.premiered && (
              <span className="details-meta-item">
                {show.premiered.slice(0, 4)}
              </span>
            )}

            {show.runtime && (
              <span className="details-meta-item">
                {show.runtime} min
              </span>
            )}
          </div>

          {show.network?.name && (
            <div className="details-network">
              <span className="network-icon">▣</span>

              <div>
                <span>Network</span>
                <strong>{show.network.name}</strong>
              </div>
            </div>
          )}

          <div className="details-divider" />

          <div className="details-summary">
            <h2>About the show</h2>

            <div
              dangerouslySetInnerHTML={{
                __html:
                  show.summary ||
                  "No summary available.",
              }}
            />
          </div>
        </div>
      </section>

      {cast.length > 0 && (
        <section className="details-cast">
          <div className="details-section-heading">
            <div>
              <p className="details-eyebrow">
                THE CAST
              </p>

              <h2>Meet the cast</h2>
            </div>
          </div>

          <div className="cast-grid">
            {cast.slice(0, 12).map((member) => {
              const actorImage =
                member.person.image?.medium ||
                "https://via.placeholder.com/300x300?text=No+Image";

              return (
                <article
                  key={member.person.id}
                  className="cast-card"
                >
                  <div className="cast-image-wrapper">
                    <img
                      src={actorImage}
                      alt={member.person.name}
                      className="cast-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="cast-content">
                    <p className="cast-name">
                      {member.person.name}
                    </p>

                    <p className="cast-role">
                      {member.character?.name ||
                        "Unknown character"}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

export default Details;