import {
  HStack,
  Button,
  Collapse,
  Flex,
  Heading,
  Text,
  Input,
  Link,
  Spacer,
  useDisclosure,
  Center,
  Progress,
  Box,
} from "@chakra-ui/react";
import DrawerSettings from "./DrawerSettings";
export default function Header(props: any) {
  return (
    <>
      <Box zIndex={999} width="full" position={"fixed"}>
        <HStack
          borderBottomWidth={"2px"}
          borderColor="gray.200"
          as={"nav"}
          bgColor={"white"}
          height={{ base: "55px", md: "60px", lg: "50px" }}
          padding={2}
          px={{ base: "20px", md: "30px", lg: "300px" }}
        >
          {/* 设置选项 */}
          <DrawerSettings
            userSettings={props.userSettings}
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
          </Heading>

          <Spacer></Spacer>
        </HStack>
        {props.isLoading ? (
          <Progress color={"whatsapp.200"} size="xs" isIndeterminate />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
