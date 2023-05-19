import { useDisclosure, Button, ScaleFade, Box } from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";

export default function ChatList(props: any) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Button onClick={onToggle}>Click Me</Button>
      <ScaleFade initialScale={0.9} in={isOpen}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          Fade
        </Box>
      </ScaleFade>
    </>
  );
}
