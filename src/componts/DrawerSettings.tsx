import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Link,
  Select,
  Spacer,
  Stack,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";

export default function DrawerSettings(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="Card" position={"absolute"}>
      <Button
        variant={"outline"}
        bgColor={"messenger.300"}
        borderRadius={"3px"}
        borderColor="gray.700"
        leftIcon={<HamburgerIcon></HamburgerIcon>}
        iconSpacing={"0"}
        onClick={onOpen}
      ></Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">设置</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">APIKEY</FormLabel>
                <Input
                  id="url"
                  onChange={props.handleKChange}
                  value={props.userSettings.userApiKey}
                  placeholder="请输入APIKEY"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="url">API</FormLabel>
                <InputGroup>
                  <Input
                    value={props.userSettings.userUrl}
                    onChange={props.handleUChange}
                    type="url"
                    id="url"
                    placeholder="请输入API地址"
                  />
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">对话模式</FormLabel>
                <Select
                  id="owner"
                  onChange={props.handleMode}
                  value={props.chatMode}
                >
                  <option value="0">问答</option>
                  <option value="1">连续</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="owner">删除</FormLabel>
                <VStack alignItems={"flex-start"}>
                  <Button
                    leftIcon={<DeleteIcon />}
                    variant="outline"
                    onClick={props.handleKey}
                    color="red"
                  >
                    删除APIKEY
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    color="red"
                    variant="outline"
                    onClick={props.handleLogClean}
                  >
                    删除对话
                  </Button>
                </VStack>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Link href="https://github.com/freesleeperr/">GitHub</Link>
            <Spacer></Spacer>
            <Button
              borderRadius={"5px"}
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                props.submit();
                onClose();
              }}
              variant="outline"
            >
              保存
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
