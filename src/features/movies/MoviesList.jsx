import MovieCard from "./MovieCard";
import { Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import { useGetMoviesQuery } from "./moviesApi";

function MoviesList() {
  const { data, isError, error, isLoading, isSuccess } = useGetMoviesQuery();
  let content;
  if (isSuccess) {
    content = (
      <SimpleGrid columns={{ sm: 1, md: 3, lg: 4 }} spacing={4}>
        {data.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            poster={`${MOVIEDB_IMAGES_URL}/${movie.poster_path}`}
          />
        ))}
      </SimpleGrid>
    );
  } else if (isLoading) {
    content = (
      <Flex alignItems="center" justifyContent="center" minH="100vh">
        <Spinner text="Loading..." />
      </Flex>
    );
  } else if (isError) {
    content = (
      <Flex alignItems="center" bg="red" justifyContent="center" minH="100vh">
        {error}
      </Flex>
    );
  }
  return (
    <>
      <Heading size="xl" textAlign="center" pb={4}>
        Trending Movies.
      </Heading>
      {content}
    </>
  );
}

export default MoviesList;
