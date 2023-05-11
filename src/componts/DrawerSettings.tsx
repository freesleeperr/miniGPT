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
  Text,
  Link,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Stack,
  useDisclosure,
  HStack,
  SliderMark,
  InputRightElement,
  Switch,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";
import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";

export default function DrawerSettings(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box className="Card">
      <Button
        color={"white"}
        variant={"ghost"}
        bgColor={"messenger.500"}
        height="30px"
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
                <InputGroup size="md">
                  <Input
                    id="url"
                    onChange={(event) => {
                      props.setUserSetting({
                        ...props.userSettings,
                        userApiKey: event.target.value,
                      });
                    }}
                    value={props.userSettings.userApiKey}
                    placeholder="请输入APIKEY"
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      border={"1px"}
                      variant={"solid"}
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor="url">API</FormLabel>
                <InputGroup>
                  <Input
                    value={props.userSettings.userUrl}
                    onChange={(event) => {
                      props.setUserSetting({
                        ...props.userSettings,
                        userUrl: event.target.value,
                      });
                    }}
                    type="url"
                    id="url"
                    placeholder="请输入API地址"
                  />
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">对话设置</FormLabel>
                <Text my={"10px"}>回答模式</Text>
                <FormLabel></FormLabel>
                <Checkbox
                  isChecked={props.chatMode}
                  onChange={(e) => {
                    props.handleMode(e.target.checked);
                  }}
                >
                  连续对话
                </Checkbox>
                <Text mt={"20px"}>对话风格</Text>
                <Slider
                  defaultValue={props.userSettings.userTemperature * 10}
                  min={0}
                  max={10}
                  aria-label="slider-ex-5"
                  onChangeEnd={props.handleSlide}
                  width="265px"
                >
                  <SliderMark mt={"5px"} value={0}>
                    精确
                  </SliderMark>
                  <SliderMark mt={"5px"} value={4.5}>
                    平衡
                  </SliderMark>
                  <SliderMark mt={"5px"} value={8.7}>
                    创意
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb border="1px" />
                </Slider>
              </Box>
            </Stack>
            <HStack mt={"100px"} justify="space-around">
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
            </HStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Link
              color={"messenger.600"}
              href="https://github.com/freesleeperr/"
            >
              @freesleeperr
            </Link>
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
