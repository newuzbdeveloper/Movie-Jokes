import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { data } from "./data";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";

function MovieDetails() {
  const { movieId } = useParams();
  const movie = data.results.find((movie) => movie.id === Number(movieId));
  return (
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
          <Heading size="md">{movie.title}</Heading>

          <Text py="2">{movie.overview}</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Generate A Joke.
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default MovieDetails;
