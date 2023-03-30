import Head from "next/head";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Center,
  Collapse,
  extendTheme,
  Fade,
  Flex,
  HStack,
  Input,
  InputGroup,
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
import { title } from "process";

interface IChat {
  question: string;
  answer: string;
  scrollRef?: any;
  time?: string;
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
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      get(e);
    }
  };
  function handleKey() {
    setKey("");
    localStorage.clear();
  }
  async function get(event: any) {
    const date = new Date();
    const currentTime = date.toLocaleString();
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
        title: "请设置API KEY，platform.openai.com/account/api-keys",
        position: "top",
        status: "warning",
        isClosable: true,
      });
      return;
    } else {
      setLoading(true);
      setQuestion(input);

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
          //my server
          "https://mini-gpt-peach.vercel.app/api/gptProxy",
          options
        );

        // const response = await fetch(
        //   "http://localhost:3000/api/gptProxy",
        //   options
        // );
        const reply = response.json();
        reply.then(
          (res) => {
            if (res.code !== 200) {
              toast({ title: res.message, status: "warning" });
              setLoading(false);
              return;
            }
            setAnsewer(res.data);
            setChatlog([
              ...chatlog,
              {
                question: input,
                answer: res.data,
                time: currentTime,
              },
            ]);
            // console.log(chatlog);
            setLoading(false);
            setInput("");
          },
          (err) => {
            toast({ title: err });
            setLoading(false);
            throw err;
          }
        );
      } catch (err) {
        console.log(err);
        toast({
          title: `${err}`,
          position: "bottom",
          status: "error",
          isClosable: true,
        });
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // console.log(chatlog);
  }, [chatlog]);
  useEffect(() => {
    const keyMe =
      localStorage.getItem("apiKey") === null || ""
        ? ""
        : localStorage.getItem("apiKey");
    setKey(keyMe);
  }, []);

  return (
    <Box className="Card" minWidth={"340px"}>
      <HStack
        zIndex={999}
        bgColor={"gray.200"}
        height={{ base: "60px", md: "60px", lg: "60px" }}
        padding={2}
        px={{ base: "20px", md: "30px", lg: "200px" }}
        shadow="lg"
      >
        <Text fontSize={{ base: "25px", md: "35px", lg: "35px" }}>
          🤖ChatGPT
        </Text>
        {loding ? (
          <Spinner
            thickness="4px"
            emptyColor="gray.300"
            color="green.400"
            mx={50}
          >
            思考中
          </Spinner>
        ) : (
          ""
        )}
        <Spacer></Spacer>
        <Link href={"https://github.com/freesleeperr?tab=repositories"}>
          <Text
            fontSize={{ base: "20px", md: "20px", lg: "30px" }}
            fontWeight={"light"}
          >
            😺
          </Text>
        </Link>
        <Flex direction={"column"}>
          <Button
            px={3}
            variant={"unstyled"}
            bgColor={"yellow.400"}
            onClick={onToggle}
          >
            设置
          </Button>
          <Collapse in={isOpen}>
            <InputGroup
              right={0}
              onChange={handleKChange}
              position={"absolute"}
              mt="4"
              fontSize={6}
              rounded="md"
              shadow="md"
              bgColor={"gray.200"}
              zIndex="999"
              maxW={"800px"}
            >
              <Input
                type="password"
                placeholder={
                  "例如:sk-xxxxxt4YCxZ2fbfZ0YnT3BlbkFJwHM9Yurwnb02FqsKZvYA"
                }
                onChange={handleKChange}
                value={key}
              ></Input>
              <Button color="red" bgColor={"gray.200"} onClick={handleKey}>
                清除
              </Button>
              <Spacer></Spacer>
            </InputGroup>
          </Collapse>
        </Flex>
      </HStack>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justify="center"
        pb={"70px"}
        pt="60px"
        px={{ base: "20px", md: "30px", lg: "200px" }}
      >
        {chatlog
          ? chatlog.map((item, index) => (
              <Box
                boxSize={"full"}
                className="card"
                key={index}
                ref={index === chatlog.length - 1 ? scrollRef : null}
              >
                <MyCard
                  question={item.question}
                  answer={item.answer}
                  time={item.time}
                  key={uuidv4()}
                />
              </Box>
            ))
          : ""}
      </Flex>
      <Flex
        px={3}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bgColor="gray.400"
        align={"center"}
        height={{ base: "65px", md: "60px", lg: "50px" }}
      >
        <Box height={{ base: "50px", md: "70px", lg: "40px" }}></Box>

        <Input
          position={"sticky"}
          height={{ base: "40px", md: "35px", lg: "30px" }}
          placeholder="在此输入问题..."
          mr="2"
          value={input}
          onChange={handleChange}
          bgColor="gray.100"
          isDisabled={loding}
          onKeyDown={handleKeyDown}
        />
        <Button
          height={{ base: "40px", md: "35px", lg: "30px" }}
          colorScheme="green"
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
