import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { selectedMovieId } from "./movieSlice";
import JokeGenerator from "src/features/ai-jokes/JokeGenerator";

function MovieDetails() {
  const { movieId } = useParams();
  const movie = useSelector((state) => selectedMovieId(state, movieId));
  return (
    <Box minH="100vh">
      <Link to={"/"}>
        <IconButton
          mb={4}
          bg="white"
          border="1px"
          borderColor="gray.300"
          aria-label="Go back."
          icon={<ArrowBackIcon />}
        />
      </Link>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={`${MOVIEDB_IMAGES_URL}/${movie.poster_path}`}
          alt={`${movie.title}'s photo`}
        />

        <Stack>
          <CardBody>
            <Heading size="lg">{movie.title}</Heading>

            <Text fontSize="2xl" py="2">
              {movie.overview}
            </Text>
          </CardBody>

          <CardFooter>
            <JokeGenerator movieId={movie.id} movieTitle={movie.title} movieDescription={movie.overview}/>
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}

export default MovieDetails;
