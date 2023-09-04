import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { Flex, Heading, SimpleGrid, Spinner, useToast } from "@chakra-ui/react";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import {
  fetchMovies,
  selectedMovies,
  selectedMoviesError,
  selectedMoviesStatus,
} from "./movieSlice";

function MoviesList() {
  const movies = useSelector(selectedMovies);
  const moviesStatus = useSelector(selectedMoviesStatus);
  const moviesError = useSelector(selectedMoviesError);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchMovies()).unwrap();
      } catch (err) {
        toast({
          title: "Failed to load movies.",
          description: "Please check your internet connection.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    fetchData();
  }, [dispatch, toast]);

  let content;
  if (moviesStatus === "succeeded") {
    content = (
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
    );
  } else if (moviesStatus === "loading") {
    content = (
      <Flex alignItems="center" justifyContent="center" minH="100vh">
        <Spinner text="Loading..." />
      </Flex>
    );
  } else if (moviesStatus === "failed") {
    <Flex alignItems="center" bg="red" justifyContent="center" minH="100vh">
      {moviesError}
    </Flex>;
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
