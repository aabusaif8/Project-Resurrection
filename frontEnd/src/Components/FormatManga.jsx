import React from "react";
import { Link } from "react-router-dom";
import './CSS/MangaCard.css';

function FormatManga({ manga }) {
  const { image_url, title, author, rating, description } = manga;

  // Log the manga object to verify its structure
  
  return (
    <div className="manga-card">
      {/* Check if imageUrl is valid before rendering the image */}
      {image_url ? (
        <img src={image_url} alt={title} className="manga-image" />
      ) : (
        <div className="manga-image-placeholder">Image not available</div> // Placeholder if no image
      )}
      <h3 className="manga-title">{title}</h3>
      <p className="manga-author">Author: {author}</p>
      <p className="manga-rating">Rating: {rating}</p>
      <p className="manga-description">{description}</p>
      <Link to={`/manga/${manga.id}`} className="read-more-button">
        Read More
      </Link>
    </div>
  );
}

export default FormatManga;