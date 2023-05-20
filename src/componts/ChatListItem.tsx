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
  let memo = props.chatlogMemoery;
  function changNUM(target: any, index: number) {
    // 获取目标元素在数组中的索引
    if (index !== -1) {
      memo.splice(index, 1); // 使用splice()方法将目标元素从数组中删除
      memo.unshift(target);
      props.setChatlogMemory(memo);
      memo = props.chatlogMemoery;
      props.setChatlog(target.chatlog);
      // 使用unshift()方法将目标元素添加到数组首位
    }
  }

  return (
    <Box m={"0"}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              color={"black"}
              bgColor={"whatsapp.400"}
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              height="30px"
            >
              记录
            </MenuButton>
            <MenuList bgColor={"black"}>
              {memo.map((element: any, index: any) => {
                return (
                  <MenuItem
                    bgColor={"black"}
                    color="wheat"
                    key={index}
                    onClick={() => {
                      changNUM(element, index);
                    }}
                  >
                    {element.chatlog[0]?.question === undefined
                      ? "NewChat"
                      : element.chatlog[0].question}
                  </MenuItem>
                );
              })}
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
}
