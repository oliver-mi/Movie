import React from "react";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";
import { getMovie } from "../services/API";
import { useQuery } from "react-query";
import styles from "../css/DetailPage.module.css";
import Actors from "./Actors";
const DetailMovies = () => {
  const { id } = useParams();
  const { data, error, isError, isLoading } = useQuery(["movie", id], () => {
    return getMovie(id);
  });

  return (
    <div className={styles.container}>
      {isLoading && <p className="my-3">Loading...</p>}
      {isError && (
        <Alert variant="warning" className="my-3">
          <strong>Error:</strong> {error.message}
        </Alert>
      )}

      {data && (
        <div>
          <img
            className={styles.img}
            src={`https://image.tmdb.org/t/p/w300${data.results.poster_path}`}
            alt={data.results.title}
          />
          <h1>{data.results.title}</h1>
          <p>{data.results.overview}</p>
          <p>{data.results.release_date}</p>
        </div>
      )}
      <Actors id={id} />
    </div>
  );
};

export default DetailMovies;
