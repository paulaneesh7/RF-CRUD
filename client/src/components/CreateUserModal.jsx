import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");

  const { colorMode } = useColorMode(); // Access current color mode

  const toast = useToast();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const user = {
      name,
      role,
      description,
      gender,
    };

    try {
      if (!name || !role || !description || !gender) {
        toast({
          status: "error",
          title: "Missing fields",
          description: "Please fill out all the fields before submitting.",
          duration: 4000,
          position: "top-center",
        });
        return; // Stop execution if validation fails
      }

      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      toast({
        status: "success",
        title: "Yayy! 🎉",
        description: "Friend added successfully.",
        duration: 2000,
        position: "top-center",
      });

      console.log(data);
    } catch (error) {
      console.error(error);
      toast({
        status: "error",
        title: "An error occurred.",
        description: error.message,
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
      setName("");
      setRole("");
      setDescription("");
      setGender("");

      //   to close the modal
      onClose();

      setUsers((prevUsers) => [...prevUsers, user]);
    }
  };

  const isFormValid = name && role && description && gender;

  const handleCancelModal = () => {
    setName("");
    setRole("");
    setDescription("");
    setGender("");
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>
        <PlusSquareIcon size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <form onSubmit={handleCreateUser}>
          <ModalContent>
            <ModalHeader
              color={useColorModeValue("gray.900", "whiteAlpha.900")}
              borderRadius="md"
              px={4}
              py={2}
            >
              Create User
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                <FormControl>
                  <FormLabel
                    color={useColorModeValue("gray.900", "whiteAlpha.900")}
                  >
                    Full Name
                  </FormLabel>

                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    color={useColorModeValue("gray.900", "whiteAlpha.900")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel
                    color={useColorModeValue("gray.900", "whiteAlpha.900")}
                  >
                    Role
                  </FormLabel>

                  <Input
                    placeholder="SoftwareEngineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    color={useColorModeValue("gray.900", "whiteAlpha.900")}
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel
                  color={useColorModeValue("gray.900", "whiteAlpha.900")}
                >
                  Description
                </FormLabel>

                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="He's a software engineer who loves to code and build things."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  color={useColorModeValue("gray.900", "whiteAlpha.900")}
                />
              </FormControl>

              <RadioGroup
                mt={4}
                value={gender}
                onChange={(value) => setGender(value)}
              >
                <Flex gap={4}>
                  <Radio value="Male">
                    <Text color={useColorModeValue("gray.900", "whiteAlpha.900")}>Male</Text>
                  </Radio>
                  <Radio value="Female">
                  <Text color={useColorModeValue("gray.900", "whiteAlpha.900")}>Female</Text>
                  </Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onClose}
                type="submit"
                isDisabled={!isFormValid}
                isLoading={isLoading}
              >
                Add
              </Button>
              <Button onClick={handleCancelModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
