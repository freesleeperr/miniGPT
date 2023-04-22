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
  const firstField = React.useRef();

  return (
    <Box className="Card">
      <Button
        borderRadius={0}
        border={"4px"}
        borderColor="black"
        colorScheme="white"
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
                  id="username"
                  onChange={props.handleKChange}
                  value={props.keyz}
                  placeholder="请输入APIKEY"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">API</FormLabel>
                <InputGroup>
                  <Input
                    value={props.url}
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
                  defaultValue="segun"
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
            <Button colorScheme="blue" onClick={props.submit}>
              保存
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
