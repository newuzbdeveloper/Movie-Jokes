import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { MOVIEDB_IMAGES_URL } from "src/common/constants";
import { ArrowBackIcon } from "@chakra-ui/icons";
import JokeGenerator from "src/features/ai-jokes/JokeGenerator";
import { useGetMoviesByIdQuery } from "./movieSlice";

function MovieDetails() {
  const { movieId } = useParams();
  const { data, isLoading, isSuccess, error, isError } =
    useGetMoviesByIdQuery(movieId);
  let content;
  if (isSuccess) {
    content = (
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={`${MOVIEDB_IMAGES_URL}/${data.poster_path}`}
          alt={`${data.title}'s photo`}
        />

        <Stack>
          <CardBody>
            <Heading size="lg">{data.title}</Heading>
            <Text py={2} color="gray.600">
              Rating: <Badge colorScheme="green">{data?.vote_average}</Badge>
            </Text>
            <Text fontSize="2xl" py="2">
              {data.overview}
            </Text>
          </CardBody>

          <CardFooter>
            <JokeGenerator
              movieId={data.id}
              movieTitle={data.title}
              movieDescription={data.overview}
            />
          </CardFooter>
        </Stack>
      </Card>
    );
  } else if (isLoading) {
    content = (
      <Flex alignItems="center" justifyContent="center">
        <Spinner text="Loading..." />
      </Flex>
    );
  } else if (isError) {
    <Flex alignItems="center" bg="red" justifyContent="center" minH="100vh">
      {error}
    </Flex>;
  }
  return (
    <Box>
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
      {content}
    </Box>
  );
}

export default MovieDetails;
