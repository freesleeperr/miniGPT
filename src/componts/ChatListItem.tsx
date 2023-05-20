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
  HStack,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import {
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  MinusIcon,
} from "@chakra-ui/icons";
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
  const [vis, setVis] = useState(true);
  function timeDiffCal(time: string) {
    const date1 = new Date(time);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff;
  }

  function changNUM(target: any, index: number) {
    if (props.chatlogMemoery.length > 1) {
      // 获取目标元素在数组中的索引
      const memo2 = props.chatlogMemoery;
      memo2.splice(index, 1); // 使用splice()方法将目标元素从数组中删除
      memo2.unshift(target);
      props.setChatlogMemory(memo2);
      setEditStatus(true);
      setMemo(memo2);
      props.setChatlog(target.chatlog);
    }

    // 使用unshift()方法将目标元素添加到数组首位
  }
  function delNUM(index: number) {
    // 获取目标元素在数组中的索引
    if (props.chatlogMemoery.length > 1) {
      const memo2 = props.chatlogMemoery;
      memo2.splice(index, 1); // 使用splice()方法将目标元素从数组中删除
      props.setChatlogMemory(memo2);
      setEditStatus(true);
      setMemo(memo2);
      localStorage.setItem("chatlogMemoery", JSON.stringify(memo));
    }
    // 使用unshift()方法将目标元素添加到数组首位
  }
  useEffect(() => {
    if (editStatus) {
      localStorage.setItem("chatlogMemoery", JSON.stringify(memo));
      setEditStatus(false);
    }
  }, [memo]);
  useEffect(() => {
    if (localStorage.getItem("chatlogMemoery") !== null) {
      const localStorageChat = JSON.parse(
        localStorage.getItem("chatlogMemoery")!
      );
      setMemo(localStorageChat);
    }
  }, []);
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
                      <HStack overflow={"hidden"} key={index}>
                        <MenuItem
                          bgColor={"black"}
                          color="wheat"
                          onClick={() => {
                            changNUM(element, index);
                          }}
                        >
                          <Text
                            maxH={"50px"}
                            overflow={"hidden"}
                            maxW={"300px"}
                          >
                            {element.chatlog[0]?.question === undefined
                              ? "NewChat"
                              : element.chatlog[0].question}
                          </Text>
                        </MenuItem>
                        <IconButton
                          onClick={() => {
                            delNUM(index);
                          }}
                          color="red.300"
                          bgColor={"transparent"}
                          variant="unstyled"
                          icon={<DeleteIcon />}
                          position={"absolute"}
                          right="0"
                          aria-label="delete"
                        ></IconButton>
                      </HStack>
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
