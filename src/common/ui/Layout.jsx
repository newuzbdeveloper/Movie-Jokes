import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout() {
  return (
    <Box background="linear-gradient(90deg, rgba(187,228,228,1) 0%, rgba(147,201,232,1) 26%, rgba(117,241,246,1) 46%, rgba(131,224,223,1) 70%, rgba(170,235,235,1) 100%)">
      <Header />
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: "1200px" }}
        m="0 auto"
        px="6"
        py="8"
      >
        <Outlet />
      </Flex>
    </Box>
  );
}

export default Layout;
