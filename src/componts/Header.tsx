import { HStack, Button } from "@chakra-ui/react";
interface IProps {
  answer: string;
  question: string;
}
export default function Header() {
  return (
    <>
      <HStack bgColor={"yellow.200"}>
        <Button>Github</Button>
      </HStack>
    </>
  );
}
