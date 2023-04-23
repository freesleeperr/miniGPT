import {
  Text,
  Heading,
  Stack,
  Flex,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Image from "next/image";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { CloseIcon } from "@chakra-ui/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { use, useState } from "react";
// interface IProps {
//   scrollRef?: any;
//   answer: string;
//   question: string;
//   time?: string;
//   status?: string;
//   id: string;

// }
export default function MyCard(props: any) {
  const [visable, setVisable] = useState(true);

  const newTheme = {
    p: (props: any) => {
      const { children } = props;
      return (
        <Text lineHeight={"27px"} fontSize={"18px"} color="black">
          {children}
        </Text>
      );
    },
  };
  // function handleVisable() {

  //   setVisable(visable ? false : true);
  //
  function deleteItem() {
    console.log(props.id);
    props.handleDelete(props.id);
  }
  return (
    <>
      <Flex
        mb={"-4px"}
        border={"4px"}
        bgColor={"messenger.500"}
        direction={"row-reverse"}
        position="relative"
      >
        <Text
          fontWeight={"bold"}
          pb={"2px"}
          px={"10px"}
          fontSize={"35px"}
          color={"white"}
        >
          {props.question ? props.question : null}
        </Text>
        <Spacer></Spacer>
        <Button
          m={"4px"}
          border={"4px"}
          borderRadius={"0"}
          bgColor={"gray.400"}
          iconSpacing="0"
          leftIcon={<CloseIcon></CloseIcon>}
          left="0"
          height={"40px"}
          width={"40px"}
          onClick={deleteItem}
        ></Button>
      </Flex>
      {visable ? (
        <Stack
          p={4}
          bgColor={props.status === "image" ? "black" : "gray.100"}
          border={"4px"}
          borderColor={"black"}
        >
          {props.status === "image" ? (
            <Flex direction={"column"} align="center">
              <img
                src={`${props.answer}`}
                alt={`${props.question}`}
                width="512"
                height="512"
              ></img>
            </Flex>
          ) : (
            <>
              <ReactMarkdown
                components={ChakraUIRenderer(newTheme)}
                children={props.answer ? ` 🤖:${props.answer}` : ""}
              />
            </>
          )}
        </Stack>
      ) : (
        <></>
      )}
      <Text fontSize={"15px"} mb="25px" color={"gray.600"}>
        {props.time} {props.status}
      </Text>
    </>
  );
}
