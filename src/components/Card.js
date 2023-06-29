import React from "react";

const Card = ({ movie }) => {
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("/");
  };

  const data = {
    title: movie.title,
    date: movie.release_date,
    img: movie.poster_path
      ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
      : "./img/poster.jpg",
    note: movie.vote_average,
    synopsis: movie.overview,
  };

  const genderFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push("Action");
          break;
        case 12:
          genreArray.push("Aventure");
          break;
        case 16:
          genreArray.push("Animation");
          break;
        case 35:
          genreArray.push("Comedie");
          break;
        case 80:
          genreArray.push("Crime");
          break;
        case 99:
          genreArray.push("Documentaire");
          break;
        case 18:
          genreArray.push("Drama");
          break;
        case 10751:
          genreArray.push("Famille");
          break;
        case 14:
          genreArray.push("Fantaisy");
          break;
        case 36:
          genreArray.push("Histoire");
          break;
        case 27:
          genreArray.push("Horreur");
          break;
        case 10402:
          genreArray.push("Music");
          break;
        case 9648:
          genreArray.push("Mystère");
          break;
        case 10749:
          genreArray.push("Romance");
          break;
        case 878:
          genreArray.push("Science Fiction");
          break;
        case 10770:
          genreArray.push("TV Movie");
          break;
        case 53:
          genreArray.push("Thriller");
          break;
        case 10752:
          genreArray.push("Guerre");
          break;
        case 37:
          genreArray.push("Western");
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <li key={genre}>{genre}</li>);
  };

  const addStorage = () => {
    let storeData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storeData.includes(movie.id.toString())) {
      storeData.push(movie.id);
      window.localStorage.movies = storeData;
    }
  };

  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");
    let newData = storedData.filter((id) => id != movie.id);
    console.log(newData);
    window.localStorage.movies = newData;
  };
  return (
    <div className="card">
      <img src={data.img} alt={`affiche ${data.title}`} />
      <h2>{data.title}</h2>
      {movie.release_date ? (
        <h5>Sortie le : {dateFormater(data.date)} </h5>
      ) : null}
      <h4>
        {data.note.toFixed(1)}/10 <span>⭐</span>
      </h4>
      <ul>
        {movie.genre_ids
          ? genderFinder()
          : movie.genres.map((genre) => <li key={genre}>{genre.name}</li>)}
      </ul>
      {data.synopsis ? <h3>Synopsis</h3> : ""}
      <p>{data.synopsis}</p>
      {movie.genre_ids ? (
        <div className="btn" onClick={() => addStorage()}>
          Ajouter aux coups de coeur
        </div>
      ) : (
        <div
          className="btn"
          onClick={() => {
            deleteStorage();
            window.location.reload();
          }}
        >
          Supprimer de la liste
        </div>
      )}
    </div>
  );
};

export default Card;
