import Head from "next/head";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Spacer,
  Spinner,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import MyCard from "@/componts/CardAnswer";
import { useEffect, useRef, useState } from "react";
import Header from "@/componts/Header";
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
  const toast = useToast();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (event: any) => {
    setInput(event.target.value);
    setQuestion(event.target.input);
    console.log(input);
  };

  async function get(event: any) {
    event.preventDefault();
    if (input == "") {
      toast({ title: "问题为空", position: "top" });
      return;
    } else {
      setLoading(true);
      setQuestion(input);
      toast({ title: `已发送,请等待`, status: "success", position: "top" });
      const sessionId = uuidv4();
      const data = JSON.stringify({
        sessionId,
        content: input,
      });
      const options = {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:3000/api/gptProxy",
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
          toast({ title: `${err}`, position: "bottom" });
          setLoading(false);
        }
      );
      setLoading(false);
      setInput("");
    }
  }
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(chatlog);
  }, [chatlog]);
  return (
    <Box>
      <HStack px={"115px"} position={"sticky"} bgColor={"gray.300"}>
        <Text fontSize={50}>你好,我是ChatGPT🤗</Text>
        {loding ? <Spinner mx={50}></Spinner> : ""}
        <Spacer></Spacer>
        <Link href={"https://github.com/freesleeperr?tab=repositories"}>
          <Text fontSize={20}>GitHub↗😺</Text>
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
      >
        <Input
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
