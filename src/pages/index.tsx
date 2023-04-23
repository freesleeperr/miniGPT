import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Center,
  Collapse,
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
  VStack,
} from "@chakra-ui/react";
import MyCard from "@/componts/CardAnswer";
import { useEffect, useRef, useState } from "react";
import Header from "@/componts/Header";
import { ArrowUpIcon, ChatIcon, ViewIcon } from "@chakra-ui/icons";
interface IChat {
  question: string;
  answer: string;
  scrollRef?: any;
  time?: string;
  status?: string;
  id: string;
}

export default function Home() {
  const [question, setQuestion] = useState<any>("");
  const [answer, setAnsewer] = useState<any>("");
  const [loding, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<any>("");
  const [chatlog, setChatlog] = useState<IChat[]>([]);
  const [chatMode, setChatMode] = useState(0);
  const [key, setKey] = useState<any>("");
  const [id, setId] = useState<any>("");
  const [url, setUrl] = useState("https://gptproxy.555913333.xyz");
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
  const handleUChange = (event: any) => {
    setUrl(event.target.value);
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
  function handleMode(event: any) {
    setChatMode(event.target.value);
  }
  function handleLogClean() {
    localStorage.removeItem("chatlog");
    setChatlog([]);
  }
  function handleKeySave() {
    setKey(key);
    localStorage.setItem("apiKey", key);
  }
  function handleAPI() {
    setUrl(url);
    localStorage.setItem("url", url);
  }
  function submit() {
    handleAPI();
    handleKeySave();
  }
  function handleDelete(id: string) {
    setChatlog(
      chatlog.filter((item) => {
        return item.id != id;
      })
    );
  }

  async function get(event: any) {
    const date = new Date();
    const currentTime = date.toLocaleString();
    let uuid = uuidv4();
    event.preventDefault();
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
      let messages: any = [];
      if (chatMode == 1) {
        if (chatlog.length > 2) {
          for (let i = 1; -1 < i; i--) {
            messages = [
              ...messages,
              {
                role: "user",
                content: chatlog[chatlog.length - 1 - i].question,
              },
              {
                role: "assistant",
                content: chatlog[chatlog.length - 1 - i].answer,
              },
            ];
          }
        }
      }
      const data = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...messages, { role: "user", content: `${input}` }],
        temperature: 0.7,
      });

      const options = {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      };

      try {
        const response = await fetch(
          //my server
          `${url}/v1/chat/completions`,
          options
        );

        // const response = await fetch(
        //   "http://localhost:3000/api/gptProxy",
        //   options
        // );
        const reply = response.json();
        reply.then(
          (res) => {
            if (response.status !== 200) {
              if (response.status == 401) {
                toast({ title: res.error.message, status: "warning" });
              }
              if (response.status == 404) {
                toast({ title: "无响应", status: "warning" });
              }
              setLoading(false);
              return;
            }

            setAnsewer(res.data);

            setChatlog([
              ...chatlog,
              {
                status: "chat",
                question: input,
                answer: res.choices[0].message.content,
                time: currentTime,
                id: uuid,
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
  async function getImg(event: any) {
    let uuid = uuidv4();
    const date = new Date();
    const currentTime = date.toLocaleString();
    event.preventDefault();
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
      const messages: any = [];

      const data = JSON.stringify({
        prompt: `${input}`,
        n: 1,
        size: "512x512",
      });

      const options = {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      };

      try {
        const response = await fetch(
          //my server
          `${url}/v1/images/generations`,
          options
        );

        // const response = await fetch(
        //   "http://localhost:3000/api/gptProxy",
        //   options
        // );
        const reply = response.json();
        reply.then(
          (res) => {
            if (response.status !== 200) {
              if (response.status == 401) {
                toast({ title: res.error.message, status: "warning" });
              }
              if (response.status == 404) {
                toast({ title: "无响应", status: "warning" });
              }
              setLoading(false);
              return;
            }

            setAnsewer(res.data);

            setChatlog([
              ...chatlog,
              {
                status: "image",
                question: input,
                answer: res.data[0].url,
                time: currentTime,
                id: uuid,
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
    if (answer !== "") {
      localStorage.setItem("chatlog", JSON.stringify(chatlog));
    }
    console.log(chatlog);
  }, [chatlog]);
  useEffect(() => {
    if (localStorage.getItem("apiKey") !== null || "") {
      setKey(localStorage.getItem("apiKey"));
    }
    if (localStorage.getItem("url") !== null || "") {
      setUrl(localStorage.getItem("url")!);
    }
    if (localStorage.getItem("chatlog") !== null) {
      const localStorageChat = JSON.parse(localStorage.getItem("chatlog")!);
      setChatlog(localStorageChat);
    }
  }, []);

  return (
    <Box minH="100vh" className="Card" minWidth={"340px"} position="relative">
      <Header
        keyz={key}
        loading={loding}
        handleKChange={handleKChange}
        handleUChange={handleUChange}
        url={url}
        submit={submit}
        handleLogClean={handleLogClean}
        handleKey={handleKey}
        handleMode={handleMode}
        chatMode={chatMode}
      ></Header>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justify="center"
        pb={"70px"}
        pt="120px"
        px={{ base: "20px", md: "30px", lg: "300px" }}
      >
        {/* {!key ? (
          <Text color={"gray.800"} borderRadius={4} p={3} bg={"yellow.400"}>
            请设置APIKEY
          </Text>
        ) : (
          <></>
        )} */}
        {chatlog.map((item, index) => (
          <Box
            key={index}
            width={"full"}
            className="card"
            ref={index === chatlog.length - 1 ? scrollRef : null}
          >
            <MyCard
              key={index}
              handleDelete={handleDelete}
              id={item.id}
              question={item.question}
              answer={item.answer}
              time={item.time}
              status={item.status}
            />
          </Box>
        ))}
      </Flex>
      <Flex
        position={"absolute"}
        bottom="5px"
        left="0"
        right="0"
        align={"flex-end"}
        p={{ base: "10px", md: "10px", lg: "10px" }}
        mx={{ base: "10px", md: "30px", lg: "290px" }}
      >
        <Textarea
          border={"4px"}
          borderRadius={0}
          maxHeight={{ base: "40px", md: "40px", lg: "80px" }}
          placeholder="在此输入问题..."
          mr="2"
          borderColor={"messenger.600"}
          value={input}
          onChange={handleChange}
          bgColor="gray.100"
          isDisabled={loding}
          onKeyDown={handleKeyDown}
        />
        <VStack>
          <Button
            leftIcon={<ViewIcon />}
            colorScheme="messenger"
            onClick={getImg}
            isDisabled={loding}
            isLoading={loding}
            spinner={<Spinner></Spinner>}
            border="4px"
            borderColor={"gray.100"}
            height="36px"
            borderRadius={0}
          >
            图片
          </Button>

          <Button
            leftIcon={<ChatIcon />}
            colorScheme="whatsapp"
            onClick={get}
            isDisabled={loding}
            isLoading={loding}
            spinner={<Spinner></Spinner>}
            border="4px"
            borderColor={"gray.800"}
            height="36px"
            borderRadius={0}
          >
            对话
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
}
