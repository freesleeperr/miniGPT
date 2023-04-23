import {
  Text,
  Heading,
  Stack,
  Flex,
  HStack,
  Button,
  Spacer,
  Divider,
  Box,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import Image from "next/image";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
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
  function handleVisable() {
    setVisable(visable ? false : true);
  }
  function deleteItem() {
    console.log(props.id);
    props.handleDelete(props.id);
  }
  return (
    <>
      <Box
        shadow={"md"}
        borderRadius="6px"
        border={"2px"}
        borderColor="gray.200"
        p="2px"
      >
        <Flex
          mb={"-4px"}
          bgColor="white"
          direction={"row-reverse"}
          position="relative"
          borderTopRadius={"5px"}
          color="white"
          py={"5px"}
          px={"16px"}
          borderBottomColor="gray.300"
          borderBottom={"5px"}
        >
          <Text
            
            fontWeight={"bold"}
            fontSize={{ base: "29px", md: "29px", lg: "30px" }}
            color={"messenger.600"}
          >
            {props.question ? props.question : null}
          </Text>
          <Spacer></Spacer>
          <ButtonGroup mt="5px" variant="solid" isAttached>
            {" "}
            <IconButton
              aria-label="avoid"
              color="red.500"
              icon={<CloseIcon />}
              onClick={deleteItem}
            ></IconButton>
            <IconButton
              color="green.300"
              aria-label="avoid"
              icon={<MinusIcon />}
              onClick={handleVisable}
            ></IconButton>{" "}
          </ButtonGroup>
        </Flex>

        {visable ? (
          <Stack
            borderBottomRadius={"6px"}
            p={"16px"}
            bgColor={props.status === "image" ? "black" : "white"}
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
      </Box>{" "}
      <Text fontSize={"10px"} mb="25px" ml={"5px"} mt="3px" color={"gray.600"}>
        {props.time} {props.status}
      </Text>
    </>
  );
}
