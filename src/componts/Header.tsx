import { AddIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  HStack,
  Heading,
  Text,
  Spacer,
  Progress,
  Box,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import ChatListItem from "./ChatListItem";
import DrawerSettings from "./DrawerSettings";
export default function Header(props: any) {
  return (
    <>
      <Box backgroundColor="black" zIndex={999} width="full" position={"fixed"}>
        <HStack
          align={"center"}
          as={"nav"}
          height={{ base: "55px", md: "60px", lg: "50px" }}
          padding={2}
          px={{ base: "20px", md: "30px", lg: "200px" }}
          justify="center"
        >
          {/* 设置选项 */}
          <DrawerSettings
            handleSlide={props.handleSlide}
            userSettings={props.userSettings}
            setUserSetting={props.setUserSetting}
            handleKChange={props.handleKChange}
            handleUChange={props.handleUChange}
            handleKey={props.handleKey}
            handleLogClean={props.handleLogClean}
            handleLog={props.handleLog}
            submit={props.submit}
            handleMode={props.handleMode}
            chatMode={props.chatMode}
          ></DrawerSettings>
          <Text textShadow={"base"} color={"whatsapp.200"}>
            ✨NeonTalk
          </Text>
          <Spacer></Spacer>
          <ChatListItem
            setChatlogMemory={props.setChatlogMemory}
            setChatlog={props.setChatlog}
            chatlogMemoery={props.chatlogMemoery}
          ></ChatListItem>
          <IconButton
            onClick={() => {
              props.newChat();
              props.setChatlog([]);
            }}
            variant={"unstyled"}
            color="yellow.300"
            height="40px"
            borderRadius={"5px"}
            icon={<Icon as={AddIcon} />}
            aria-label="chatList"
          ></IconButton>
        </HStack>
        {props.isLoading ? (
          <Progress colorScheme={"green"} size="xs" isIndeterminate />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
