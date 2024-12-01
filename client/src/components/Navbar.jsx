import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import CreateUserModal from "./CreateUserModal";

// import CreateUserModal from "./CreateUserModal";

const Navbar = ({ setUsers, colorMode, toggleColorMode }) => {
	// const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Container maxW={"900px"}>
			<Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.500", "gray.700")}>
				<Flex h='16' alignItems={"center"} justifyContent={"space-between"}>
					{/* Left side */}
					<Flex
						alignItems={"center"}
						justifyContent={"center"}
						gap={3}
						display={{ base: "none", sm: "flex" }}
					>
						<Text fontSize={"lg"} fontWeight={500}>React + Flask CRUD App </Text>
					</Flex>
					{/* Right side */}
					<Flex gap={3} alignItems={"center"}>
						<Text fontSize={"lg"} fontWeight={500} display={{ base: "none", md: "block" }}>
							BFFship 🔥
						</Text>

						<Button onClick={toggleColorMode}>
							{colorMode === "light" ? <MoonIcon /> : <SunIcon size={20} />}
						</Button>
						<CreateUserModal setUsers={setUsers}/>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
};
export default Navbar;