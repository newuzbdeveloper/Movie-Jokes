import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import { selectedMovies } from "./movieSlice";

function MoviesList() {
  const movies = useSelector(selectedMovies);
  return (
    <>
      <Heading size="xl" textAlign="center" pb={4}>
        Trending Movies.
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={4}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            poster={`${MOVIEDB_IMAGES_URL}/${movie.poster_path}`}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

export default MoviesList;
