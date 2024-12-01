import {
  Button,
  Container,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { color } from "framer-motion";
import UserGrid from "./components/UserGrid";
import { useState } from "react";

export const BASE_URL = "http://127.0.0.1:5000/api/friends";

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [users, setUsers] = useState([]);

  return (
    <Stack minH={"100vh"} bg={useColorModeValue("gray.200", "gray.900")}>
      <Navbar
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        setUsers={setUsers}
      />

      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text
            as={"span"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            Friendfinity
          </Text>
          ♾️
        </Text>

        <UserGrid users={users} setUsers={setUsers} />
      </Container>
    </Stack>
  );
}
