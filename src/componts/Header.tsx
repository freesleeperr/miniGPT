import {
  HStack,
  Button,
  Collapse,
  Flex,
  Heading,
  Text,
  Input,
  InputGroup,
  Link,
  Spacer,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import ChatSettings from "./ChatSetting";
import DrawerSettings from "./DrawerSettings";

export default function Header(props: any) {
  return (
    <>
      <HStack
        borderBottomWidth={"4px"}
        borderColor="gray.200"
        as={"nav"}
        width="full"
        position={"fixed"}
        zIndex={999}
        bgColor={"white"}
        height={{ base: "60px", md: "60px", lg: "50px" }}
        padding={2}
        px={{ base: "20px", md: "30px", lg: "300px" }}
      >
        {/* 设置选项 */}
        <DrawerSettings
          url={props.url}
          keyz={props.keyz}
          handleKChange={props.handleKChange}
          handleUChange={props.handleUChange}
          handleKey={props.handleKey}
          handleLogClean={props.handleLogClean}
          handleLog={props.handleLog}
          submit={props.submit}
          handleMode={props.handleMode}
          chatMode={props.chatMode}
        ></DrawerSettings>
        <Spacer></Spacer>
        <Heading fontSize={"25px"} color="messenger.600">
          🤖miniGPT
        </Heading>{" "}
        <Spacer></Spacer>
      </HStack>
    </>
  );
}
