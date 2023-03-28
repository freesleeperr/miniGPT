import Head from "next/head";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Center,
  Fade,
  Flex,
  HStack,
  Input,
  Spacer,
  Spinner,
  Text,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MyCard from "@/componts/CardAnswer";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface IChat {
  question: string;
  answer: string;
  scrollRef?: any;
}

export default function Home() {
  const [question, setQuestion] = useState<any>("");
  const [answer, setAnsewer] = useState<any>("");
  const [loding, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<any>("");
  const [chatlog, setChatlog] = useState<IChat[]>([]);
  const [key, setKey] = useState<any>("");
  const toast = useToast();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, onToggle } = useDisclosure();
  const handleChange = (event: any) => {
    setInput(event.target.value);
    setQuestion(event.target.input);
  };
  const handleKChange = (event: any) => {
    setKey(event.target.value);
  };

  async function get(event: any) {
    event.preventDefault();
    localStorage.setItem("apiKey", key);
    if (input == "") {
      toast({
        title: "问题为空",
        position: "top",
        status: "warning",
        isClosable: true,
      });
      return;
    } else if (key == "" || null) {
      toast({
        title: "请输入API KEY",
        position: "top",
        status: "warning",
        isClosable: true,
      });
      return;
    } else {
      setLoading(true);
      setQuestion(input);
      toast({
        title: `已发送,请等待`,
        status: "success",
        position: "top",
        isClosable: true,
      });
      const sessionId = uuidv4();
      const data = JSON.stringify({
        sessionId,
        content: input,
        key,
      });
      const options = {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(
          "https://mini-gpt-snowy.vercel.app/api/gptProxy",
          options
        );

        // const response = await fetch("http://localhost:3000/api/hello", options);
        const reply = response.json();
        reply.then(
          (res) => {
            if (res.status == 400) {
              toast(res.message);
              return;
            }
            setAnsewer(res.data);
            setChatlog([
              ...chatlog,
              {
                question: input,
                answer: res.data,
              },
            ]);
            setLoading(false);
          },
          (err) => {
            setLoading(false);
            throw err;
          }
        );
      } catch (err) {
        toast({
          title: `${err}`,
          position: "bottom",
          status: "error",
          isClosable: true,
        });
      }

      setLoading(false);
      setInput("");
    }
  }
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatlog]);
  useEffect(() => {
    setKey(localStorage.getItem("apiKey"));
    console.log(localStorage.getItem("apiKey"));
  }, []);
  return (
    <Box>
      <HStack
        background={"fixed"}
        bgColor={"gray.300"}
        height={{ base: "60px", md: "100px", lg: "100px" }}
        padding={4}
      >
        <Text fontSize={{ base: "16px", md: "20px", lg: "30px" }}>
          你好,我是ChatGPT🤗
        </Text>
        {loding ? <Spinner mx={50}></Spinner> : ""}
        <Spacer></Spacer>
        <Flex direction={"column"}>
          <Button
            onClick={onToggle}
            fontSize={{ base: "15px", md: "20px", lg: "30px" }}
          >
            API_KEY设置
          </Button>
          <Fade in={isOpen}>
            <Input
              left={0}
              value={key}
              onChange={handleKChange}
              position={"absolute"}
              color="green"
              mt="4"
              rounded="md"
              shadow="md"
              placeholder={
                "例如:sk-xxxxxt4YCxZ2fbfZ0YnT3BlbkFJwHM9Yurwnb02FqsKZvYA"
              }
              bgColor={"gray.200"}
            ></Input>
          </Fade>
        </Flex>
        <Link href={"https://github.com/freesleeperr?tab=repositories"}>
          <Text fontSize={{ base: "10px", md: "20px", lg: "30px" }}>
            GitHub↗😺
          </Text>
        </Link>
      </HStack>

      <Box>
        {chatlog
          ? chatlog.map((item, index) => (
              <div
                key={index}
                ref={index === chatlog.length - 1 ? scrollRef : null}
              >
                <MyCard
                  question={item.question}
                  answer={item.answer}
                  key={uuidv4()}
                />
              </div>
            ))
          : ""}
      </Box>
      <Flex
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        p="4"
        bg="white"
        borderTop="1px solid gray"
        bgColor="yellow.200"
        align={"center"}
      >
        <Input
          height={{ base: "50px", md: "70px", lg: "100px" }}
          placeholder="在此输入问题..."
          mr="2"
          value={input}
          onChange={handleChange}
          bgColor="white"
          isDisabled={loding}
        />
        <Button
          colorScheme="yellow"
          onClick={get}
          isDisabled={loding}
          isLoading={loding}
        >
          发送
        </Button>
      </Flex>
    </Box>
  );
}
