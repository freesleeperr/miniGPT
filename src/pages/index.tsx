import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import MyCard from "@/componts/CardAnswer";
import { useEffect, useRef, useState } from "react";
import Header from "@/componts/Header";
import { ChatIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { RiImageAddLine } from "react-icons/ri";

interface IChat {
  question: string;
  answer: string;
  scrollRef?: any;
  time?: string;
  status?: string;
  id: string;
}
interface ISetting {
  userUrl: string;
  userApiKey: string;
  userTemperature: number;
}
interface IMessageChat {
  content: string;
  role: string;
}
interface requestChat {}
export default function Home() {
  const [answer, setAnsewer] = useState<any>("");
  const [loding, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<any>("");
  const [chatlog, setChatlog] = useState<IChat[]>([]);
  const [chatMode, setChatMode] = useState("0");
  const [reduceLog, setreduceLog] = useState<boolean>(false);
  const [userSettings, setUserSetting] = useState<ISetting>({
    userUrl: "https://gptproxy.555913333.xyz",
    userApiKey: "",
    userTemperature: 1,
  });
  const toast = useToast();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (event: any) => {
    setInput(event.target.value);
  };
  const handleKChange = (event: any) => {
    setUserSetting({ ...userSettings, userApiKey: event.target.value });
  };
  const handleUChange = (event: any) => {
    setUserSetting({ ...userSettings, userUrl: event.target.value });
  };
  function handleKey() {
    setUserSetting({ ...userSettings, userApiKey: "" });
    submit();
  }
  function handleMode(event: any) {
    setChatMode(event.target.value);
  }
  function handleSlide(val: any) {
    setUserSetting({
      ...userSettings,
      userTemperature: val / 10,
    });
  }
  function handleLogClean() {
    localStorage.removeItem("chatlog");
    setChatlog([]);
  }

  function submit() {
    // setUserSetting({
    //   userUrl: url,
    //   userApiKey: key,
    //   userTemperature: 1,
    // });
    setUserSetting({ ...userSettings });
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  }
  function handleDelete(id: string) {
    const dataItem = chatlog.filter((item) => {
      return item.id != id;
    });
    setChatlog(dataItem);
    setreduceLog(true);
  }
  async function get(requestUrl: any, requestBody: any) {
    const options = {
      method: "POST",
      body: requestBody,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userSettings.userApiKey}`,
      },
    };
    try {
      const data = await fetch(requestUrl, options)
        .then((response: any) => {
          return response.json().then((data: any) => {
            if (!response.ok) {
              toast({
                title: data.error.message,
                status: "warning",
                isClosable: true,
              });
              setLoading(false);
            }
            return data;
          });
        })
        .then((response: any) => {
          setLoading(false);
          setInput("");
          return response;
        });
      return data;
    } catch (err) {
      toast({
        title: `${err}`,
        position: "bottom",
        status: "error",
        isClosable: true,
      });
      setLoading(false);
    }
  }
  function checkInput() {
    if (input == "") {
      toast({
        title: "问题为空",
        duration: 800,
        position: "top",
        status: "warning",
        isClosable: true,
      });
      return false;
    } else if (userSettings.userApiKey == "" || null) {
      toast({
        title: "请设置API KEY，platform.openai.com/account/api-keys",
        position: "top",
        status: "warning",
        isClosable: true,
      });
      return false;
    } else if (userSettings.userApiKey == "" || null) {
      toast({
        title: "请设置API 地址，platform.openai.com/account/api-keys",
        position: "top",
        status: "warning",
        isClosable: true,
      });
      return false;
    } else {
      setLoading(true);
      toast({
        title: "提交成功",
        position: "top",
        duration: 800,
        status: "success",
      });
      return true;
    }
  }
  async function getChat() {
    if (checkInput()) {
      const date = new Date();
      const currentTime = date.toLocaleString();
      let uuid = uuidv4();
      let messages: IMessageChat[] = [];
      if (chatMode === "1") {
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
        } else if (chatlog.length === 1) {
          messages = [
            {
              role: "user",
              content: chatlog[chatlog.length - 1].question,
            },
            {
              role: "assistant",
              content: chatlog[chatlog.length - 1].answer,
            },
          ];
        }
      }
      const data = {
        model: "gpt-3.5-turbo",
        messages: [...messages, { role: "user", content: `${input}` }],
        temperature: userSettings.userTemperature,
      };
      const requestBody = JSON.stringify(data);
      const requestUrl = `${userSettings.userUrl}/v1/chat/completions`;
      const response = await get(requestUrl, requestBody);
      if (response.error) {
        return;
      }
      setChatlog([
        ...chatlog,
        {
          status: "chat",
          question: input,
          answer: response.choices[0].message.content,
          time: currentTime,
          id: uuid,
        },
      ]);
      setAnsewer(response.choices[0].message.content);
      setLoading(false);
    }
    setLoading(false);
  }

  async function getImage() {
    if (checkInput()) {
      const date = new Date();
      const currentTime = date.toLocaleString();
      let uuid = uuidv4();
      const data = {
        prompt: `${input}`,
        n: 1,
        size: "512x512",
      };
      const requestBody = JSON.stringify(data);
      const requestUrl = `${userSettings.userUrl}/v1/images/generations`;
      const response = await get(requestUrl, requestBody);

      if (response) {
        setChatlog([
          ...chatlog,
          {
            status: "image",
            question: input,
            answer: response.data[0].url,
            time: currentTime,
            id: uuid,
          },
        ]);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (answer !== "" || reduceLog) {
      localStorage.setItem("chatlog", JSON.stringify(chatlog));
      setreduceLog(false);
    }
  }, [chatlog]);
  useEffect(() => {
    if (localStorage.getItem("userSettings") !== null || "") {
      setUserSetting(JSON.parse(localStorage.getItem("userSettings")!));
    }

    if (localStorage.getItem("chatlog") !== null) {
      const localStorageChat = JSON.parse(localStorage.getItem("chatlog")!);
      const storedData = localStorage.getItem("chatlog");
      setChatlog(localStorageChat ? JSON.parse(storedData!) : []);
    }
  }, []);

  return (
    <Box
      pb={"25px"}
      minH="100vh"
      className="Card"
      minWidth={"340px"}
      position="relative"
    >
      <Header
        handleSlide={handleSlide}
        userSettings={userSettings}
        loading={loding}
        handleKChange={handleKChange}
        handleUChange={handleUChange}
        submit={submit}
        handleLogClean={handleLogClean}
        handleKey={handleKey}
        handleMode={handleMode}
        chatMode={chatMode}
        isLoading={loding}
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
        bottom="25px"
        left="0"
        right="0"
        align={"flex-end"}
        mx={{ base: "10px", md: "30px", lg: "260px" }}
      >
        <Textarea
          borderRadius={"5px"}
          maxHeight={{ base: "40px", md: "40px", lg: "80px" }}
          placeholder="在此输入问题..."
          mr="2"
          borderColor={"messenger.600"}
          value={input}
          onChange={handleChange}
          bgColor="white"
          isDisabled={loding}
        />
        <HStack>
          <ButtonGroup height="80px" variant="outline" isAttached>
            <Button
              leftIcon={<ChatIcon />}
              colorScheme="whatsapp"
              onClick={getChat}
              isDisabled={loding}
              isLoading={loding}
              borderRadius={"5px"}
              width={"80px"}
              height="80px"
              bgColor={"green.200"}
            >
              对话
            </Button>
            <IconButton
              aria-label="图片生成"
              icon={<Icon as={RiImageAddLine} />}
              colorScheme="messenger"
              onClick={getImage}
              isDisabled={loding}
              isLoading={loding}
              borderColor={"gray.400"}
              width={"40px"}
              height="80px"
              borderRadius={"5px"}
              bgColor={"blue.100"}
            ></IconButton>
          </ButtonGroup>
        </HStack>
      </Flex>
    </Box>
  );
}
