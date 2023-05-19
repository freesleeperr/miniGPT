import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
  ButtonGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Popover,
} from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";
import React from "react";
export default function ChatList(props: any) {
  const initRef = React.useRef();
  return (
    <>
      <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <IconButton
                onClick={props.newChat}
                variant={"unstyled"}
                color="yellow.300"
                width={"40px"}
                height="20px"
                borderRadius={"5px"}
                icon={<Icon as={RepeatClockIcon} />}
                aria-label="newChat"
              ></IconButton>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverHeader>This is the header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Box>
                    Hello. Nice to meet you! This is the body of the popover
                  </Box>
                  <Button
                    mt={4}
                    colorScheme="blue"
                    onClick={onClose}
                    ref={initRef}
                  >
                    Close
                  </Button>
                </PopoverBody>
                <PopoverFooter>This is the footer</PopoverFooter>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </>
  );
}
