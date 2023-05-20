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
import { useEffect, useState } from "react";
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
  const [editStatus, setEditStatus] = useState(false);
  const [memo, setMemo] = useState(props.chatlogMemoery);
  function timeDiffCal(time: string) {
    const date1 = new Date(time);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff;
  }

  function changNUM(target: any, index: number) {
    // 获取目标元素在数组中的索引
    const memo2 = props.chatlogMemoery;
    memo2.splice(index, 1); // 使用splice()方法将目标元素从数组中删除
    memo2.unshift(target);
    props.setChatlogMemory(memo2);
    setEditStatus(true);
    setMemo(memo2);
    props.setChatlog(target.chatlog);
    setEditStatus(false);
    // 使用unshift()方法将目标元素添加到数组首位
  }
  useEffect(() => {
    if (editStatus) {
      localStorage.setItem("chatlogMemoery", memo);
    }
  }, [memo]);
  return (
    <Box m={"0"}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              _hover={{ bgColor: "whatsapp.400", color: "black" }}
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
              {props.chatlogMemoery
                ? props.chatlogMemoery.map((element: any, index: any) => {
                    return (
                      <MenuItem
                        overflow={"hidden"}
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
                  })
                : "None"}
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
}
