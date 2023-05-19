import {
  Text,
  Stack,
  Flex,
  Spacer,
  Box,
  IconButton,
  ButtonGroup,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { ChevronDownIcon, CloseIcon, MinusIcon } from "@chakra-ui/icons";
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
export default function chatListItem(props: any) {
  function timeDiffCal(time: string) {
    const date1 = new Date(time);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff;
  }
  //   const memoj = localStorage.getItem("chatlogMemoery");
  //   const memo = JSON.parse(memoj!);
  return (
    <Box m={"0"}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              color={"white"}
              bgColor={"black"}
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {isOpen ? "Close" : "Open"}
            </MenuButton>
            {/* <MenuList>
              {memo.forEach((element: any) => {
                <MenuItem>{element.chatlog[0].question}</MenuItem>;
              })}

              <MenuItem onClick={() => alert(memo)}>Create a Copy</MenuItem>
            </MenuList> */}
          </>
        )}
      </Menu>
    </Box>
  );
}
