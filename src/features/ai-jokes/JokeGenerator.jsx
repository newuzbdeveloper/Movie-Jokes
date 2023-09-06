import { Badge, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJoke, selectJokeStatus, selectedJokeById } from "./aiJokesSlice";

function JokeGenerator({ movieId, movieTitle, movieDescription }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const jokeStatus = useSelector(selectJokeStatus);
  const joke = useSelector((state) => selectedJokeById(state, movieId));

  const handleGenerateJoke = async () => {
    try {
      await dispatch(
        fetchJoke({ movieId, movieTitle, movieDescription })
      ).unwrap();
    } catch (err) {
      toast({
        title: "Failed to load Jokes.",
        description: "Please check your internet connection.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex display="column" gap={4} width="100%">
      {joke && (
        <Text mb={2} fontWeight="bold" fontSize="md">
          <Badge fontSize="0.9em" colorScheme="green" mr={1}>
            Joke
          </Badge>
          <Text as="span">{joke}</Text>
        </Text>
      )}
      <Button
        isLoading={jokeStatus === "loading"}
        variant="solid"
        bg="green.300"
        color="white"
        width="100%"
        onClick={handleGenerateJoke}
      >
        {joke ? "Regenerate" : "Generate"} Joke
      </Button>
    </Flex>
  );
}

export default JokeGenerator;
