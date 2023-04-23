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

import { useState } from "react";
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
        bgColor={"gray.200"}
        direction={"row-reverse"}
        position="relative"
        borderColor="gray.300"
        border={"4px"}
        borderTopRadius={"5px"}
      >
        <Text
          fontWeight={"bold"}
          pb={"2px"}
          px={"10px"}
          fontSize={{ base: "30px", md: "30px", lg: "35px" }}
          color={"black"}
        >
          {props.question ? props.question : null}
        </Text>
        <Spacer></Spacer>
        <Button
          m={"6px"}
          border={"4px"}
          borderColor="gray.900"
          borderRadius={"0"}
          bgColor={"gray.300"}
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
          borderBottomRadius={"5px"}
          p={4}
          bgColor={props.status === "image" ? "black" : "white"}
          border={"4px"}
          borderColor={"gray.900"}
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
