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
  Heading,
  HStack,
  Input,
  InputGroup,
  Spacer,
  Spinner,
  Text,
  Textarea,
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
  const [id, setId] = useState<any>("");
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
    localStorage.removeItem("apiKey");
  }
  function handleLog() {
    if (answer !== "") {
      localStorage.setItem("chatlog", JSON.stringify(chatlog));
      toast({
        title: "已保存",
        status: "success",
        position: "top",
        duration: 800,
      });
    }
  }
  function handleLogClean() {
    localStorage.removeItem("chatlog");
  }
  async function get(event: any) {
    const date = new Date();
    const currentTime = date.toLocaleString();
    event.preventDefault();
    localStorage.setItem("apiKey", key);
    if (localStorage.getItem("uuid") === null || "null") {
      localStorage.setItem("uuid", uuidv4());
    }
    setId(localStorage.getItem("uuid"));
    if (input == "") {
      toast({
        title: "问题为空",
        duration: 800,
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
      toast({
        title: "提交成功",
        position: "top",
        duration: 800,
        status: "success",
      });

      const data = JSON.stringify({
        sessionId: id,
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
        // const response = await fetch(
        //   //my server
        //   "https://mini-gpt-peach.vercel.app/api/gptProxy",
        //   options
        // );

        const response = await fetch(
          "http://localhost:3000/api/gptProxy",
          options
        );
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
    if (localStorage.getItem("uuid") !== "" || null) {
      localStorage.setItem("uuid", localStorage.getItem("uuid")!);
      setId(localStorage.getItem("uuid"));
    }
    setId(localStorage.getItem("uuid"));
    if (localStorage.getItem("apiKey") !== null || "") {
      setKey(localStorage.getItem("apiKey"));
    }

    if (localStorage.getItem("chatlog") !== null) {
      const localStorageChat = JSON.parse(localStorage.getItem("chatlog")!);
      setChatlog(localStorageChat);
    }
  }, []);

  return (
    <Box minH="100vh" className="Card" minWidth={"340px"} position="relative">
      <HStack
        as={"nav"}
        width="full"
        position={"fixed"}
        zIndex={999}
        bgColor={"gray.300"}
        height={{ base: "60px", md: "60px", lg: "70px" }}
        padding={2}
        px={{ base: "20px", md: "30px", lg: "300px" }}
        shadow="lg"
      >
        <Heading
          px={1}
          shadow="dark-lg"
          bgColor={"black"}
          fontSize={{ base: "20px", md: "30px", lg: "30px" }}
        >
          <Text
            textColor={loding ? "green.400" : "gray.200"}
            className={loding ? "blinking" : ""}
          >
            🤖 ChatGPT
          </Text>
        </Heading>

        <Spacer></Spacer>
        <Link href={"https://github.com/freesleeperr?tab=repositories"}>
          <Text
            fontSize={{ base: "20px", md: "20px", lg: "30px" }}
            fontWeight={"light"}
          >
            😺
          </Text>
        </Link>
        <Button
          px={3}
          variant={"unstyled"}
          bgColor={"green.300"}
          onClick={handleLog}
          shadow="md"
          isDisabled={answer == ""}
        >
          保存记录
        </Button>
        <Flex direction={"column"}>
          <Button
            px={3}
            variant={"unstyled"}
            bgColor={"yellow.400"}
            onClick={onToggle}
            shadow="md"
          >
            设置
          </Button>
          <Collapse in={isOpen}>
            <InputGroup
              onChange={handleKChange}
              position={"absolute"}
              mt="4"
              fontSize={6}
              rounded="md"
              shadow="md"
              bgColor={"gray.200"}
              zIndex="999"
              maxW={"500px"}
              width={{ base: "330px", md: "330px", lg: "400px" }}
              right={{ base: "20px", md: "30px", lg: "200px" }}
              px={3}
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
                清除APIKEY
              </Button>
            </InputGroup>
            <Button
              position={"absolute"}
              top={"110px"}
              right={{ base: "20px", md: "30px", lg: "200px" }}
              color="red"
              bgColor={"gray.200"}
              onClick={handleLogClean}
              zIndex={999}
            >
              清除记录
            </Button>
          </Collapse>
        </Flex>
      </HStack>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justify="center"
        pb={"70px"}
        pt="120px"
        px={{ base: "20px", md: "30px", lg: "300px" }}
      >
        {!key ? (
          <Text color={"gray.800"} borderRadius={4} p={3} bg={"yellow.400"}>
            请设置APIKEY
          </Text>
        ) : (
          chatlog.map((item, index) => (
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
              />
            </Box>
          ))
        )}
      </Flex>
      <Flex
        bgColor={"gray.300"}
        shadow={"dark-lg"}
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        align={"center"}
        py={{ base: "10px", md: "10px", lg: "10px" }}
        px={{ base: "20px", md: "30px", lg: "200px" }}
      >
        <Textarea
          maxHeight={{ base: "40px", md: "40px", lg: "80px" }}
          placeholder="在此输入问题..."
          mr="2"
          value={input}
          onChange={handleChange}
          bgColor="gray.100"
          isDisabled={loding}
          onKeyDown={handleKeyDown}
        />
        <Button
          height={{ base: "40px", md: "40px", lg: "40px" }}
          colorScheme="yellow"
          onClick={get}
          isDisabled={loding}
          isLoading={loding}
          spinner={
            <Spinner
              thickness="4px"
              emptyColor="white"
              color="green.900"
            ></Spinner>
          }
          shadow="md"
        >
          发送
        </Button>
      </Flex>
    </Box>
  );
}
