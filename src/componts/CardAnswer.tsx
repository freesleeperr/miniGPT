import { Text, Heading, Stack, Flex } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
interface IProps {
  scrollRef?: any;
  answer: string;
  question: string;
  time?: string;
  status?: string;
}
export default function MyCard(props: IProps) {
  const newTheme = {
    p: (props: any) => {
      const { children } = props;
      return (
        <Text lineHeight={"27px"} fontSize={"18px"} color="black">
          🤖:{children}
        </Text>
      );
    },
  };

  return (
    <>
      <Flex
        mb={"-4px"}
        border={"4px"}
        bgColor={"pink.400"}
        direction={"row-reverse"}
      >
        <Heading px={"4px"} fontSize={"35px"} color={"gray.100"}>
          {props.question ? props.question : null}
        </Heading>
      </Flex>
      <Stack p={4} bgColor="gray.100" border={"4px"} borderColor={"black"}>
        <ReactMarkdown
          components={ChakraUIRenderer(newTheme)}
          children={props.answer ? `${props.answer}` : ""}
        />
      </Stack>
      <Text fontSize={"15px"} mb="25px" color={"gray.600"}>
        {props.time} {props.status}
      </Text>
    </>
  );
}
