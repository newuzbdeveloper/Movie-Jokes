import { data } from "./data";
import MovieCard from "./MovieCard";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";

function MoviesList() {
  return (
    <>
      <Heading size="xl" textAlign="center" pb={4}>
        Trending Movies.
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={4}>
        {data.results.map((movie) => (
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
