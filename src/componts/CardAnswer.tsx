import {
  Text,
  Stack,
  Flex,
  Spacer,
  Box,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { CloseIcon, MinusIcon } from "@chakra-ui/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";
import { time } from "console";
// interface IProps {
//   scrollRef?: any;
//   answer: string;
//   question: string;
//   time?: string;
//   status?: string;
//   id: string;

// }
export default function MyCard(props: any) {
  const date1 = new Date(props.time);
  const date2 = new Date();
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const hoursDiff = timeDiff / (1000 * 3600);

  const [visable, setVisable] = useState(() => {
    if (hoursDiff > 4) {
      return false;
    } else {
      return true;
    }
  });

  const newTheme = {
    p: (props: any) => {
      const { children } = props;
      return (
        <>
          <Text lineHeight={"27px"} fontSize={"18px"} color="messenger.300">
            {children}
          </Text>
        </>
      );
    },
    code: (props: any) => {
      const { className, children } = props;
      const language = className?.replace("language-", "") || "";
      return (
        <SyntaxHighlighter
          children={children}
          language={language}
          style={dracula}
        ></SyntaxHighlighter>
      );
    },
  };
  const newTheme2 = {
    p: (props: any) => {
      const { children } = props;
      return (
        <>
          <Text lineHeight={"27px"} fontSize={"26px"} color="green.300">
            {children}
          </Text>
        </>
      );
    },
    code: (props: any) => {
      const { className, children } = props;
      const language = className?.replace("language-", "") || "";
      return (
        <SyntaxHighlighter
          children={children}
          language={language}
          style={dracula}
        ></SyntaxHighlighter>
      );
    },
  };
  function handleVisable() {
    setVisable(visable ? false : true);
  }
  function deleteItem() {
    props.handleDelete(props.id);
  }
  return (
    <>
      <Box>
        <Flex
          direction={"row-reverse"}
          position="relative"
          alignItems={"center"}
          px={"16px"}
          py="15px"
        >
          <Text
            fontWeight={"bold"}
            fontSize={{ base: "29px", md: "29px", lg: "30px" }}
            color={"white"}
          >
            <ReactMarkdown skipHtml components={ChakraUIRenderer(newTheme2)}>
              {props.question ? props.question : null}
            </ReactMarkdown>
          </Text>
          <Spacer></Spacer>
          <Flex direction={"column"}>
            <ButtonGroup
              flexDirection={"column"}
              mr={"10px"}
              ml={"-8px"}
              variant="ghost"
              justifyContent={"space-between"}
              isAttached
            >
              <IconButton
                borderRadius={"0"}
                borderEndRadius={"24px"}
                aria-label="avoid"
                color="yellow.200"
                icon={<CloseIcon />}
                onClick={deleteItem}
              ></IconButton>
              <IconButton
                borderRadius={"0"}
                color="green.300"
                aria-label="avoid"
                icon={<MinusIcon />}
                onClick={handleVisable}
              ></IconButton>{" "}
            </ButtonGroup>
          </Flex>
        </Flex>

        {visable ? (
          <Stack p={"16px"}>
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
                  skipHtml
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
    </>
  );
}
