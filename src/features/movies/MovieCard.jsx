import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function MovieCard({ id, title, overview, poster }) {
  return (
    <Card borderRadius={30} bg={"white"} shadow="2xl">
      <CardHeader pb={0}>
        <Image
          m="0 auto"
          borderRadius="lg"
          src={poster}
          alt={`${title}'s photo`}
          mb={2}
        />
      </CardHeader>
      <CardBody minH={130}>
        <Heading size="md" pb={2}>
          {title}
        </Heading>
        <Text fontSize="xl" color="black.700">
          {overview.substring(0, 50) + "..."}
        </Text>
      </CardBody>
      <CardFooter pt={2}>
        <Link to={`/movies/${id}`} style={{ width: "100%" }}>
          <Button w="100%" color="white" m="auto" bg="green.300">
            View Joke & More.
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default MovieCard;
