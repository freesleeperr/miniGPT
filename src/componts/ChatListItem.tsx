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
export default function chatList(props: any) {
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
          <Text
            fontWeight={"light"}
            lineHeight={"27px"}
            fontSize={"18px"}
            color="messenger.100"
            children={children}
          ></Text>
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
          <Text
            width={"inherit"}
            textOverflow={"ellipsis"}
            lineHeight={"27px"}
            fontSize={"25px"}
            fontWeight="semibold"
            color="whatsapp.200"
            children={children}
          ></Text>
        </>
      );
    },
    code: (props: any) => {
      const { className, children } = props;
      const language = className?.replace("language-", "") || "";
      return (
        <SyntaxHighlighter
          wrapLongLines
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
      <Box p={"20px"}>
        <Flex direction={"row-reverse"} py="15px">
          <Stack>
            <>
              <ReactMarkdown skipHtml components={ChakraUIRenderer(newTheme2)}>
                {props.question ? props.question : null}
              </ReactMarkdown>
            </>
          </Stack>
          <Spacer></Spacer>
          <Flex
            direction={"column"}
            align="flex-start"
            justifyContent={"flex-start"}
            mt="-8px"
          >
            <ButtonGroup
              flexDirection={"column"}
              mr={"10px"}
              ml={"-8px"}
              variant="ghost"
              justifyContent={"space-between"}
              isAttached
            >
              <IconButton
                variant={"unstyled"}
                borderRadius={"0"}
                borderEndRadius={"24px"}
                aria-label="avoid"
                color="red.200"
                icon={<CloseIcon />}
                onClick={deleteItem}
              ></IconButton>
              <IconButton
                variant={"unstyled"}
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
          <Stack>
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
