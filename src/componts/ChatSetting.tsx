import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
export default function ChatSettings(props: any) {
  return (
    <Menu>
      <MenuButton as={Button} leftIcon={<AddIcon></AddIcon>}>
        对话
      </MenuButton>
      <MenuList>
        <MenuItem>新对话</MenuItem>
        <MenuItem>删除当前对话</MenuItem>
      </MenuList>
    </Menu>
  );
}
