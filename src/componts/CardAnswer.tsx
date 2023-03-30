import {
  Text,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

import ReactMarkdown from "react-markdown";
interface IProps {
  scrollRef?: any;
  answer: string;
  question: string;
  time?: string;
}
export default function MyCard(props: IProps) {
  const newTheme = {
    p: (props: any) => {
      const { children } = props;
      return (
        <Text lineHeight={"27px"} fontSize={"18px"} color="black">
          {children}
        </Text>
      );
    },
  };

  return (
    <Flex justifyItems={"start"} direction={"column"} mb={10}>
      <Flex direction={"row-reverse"}>
        <Card
          paddingX={4}
          paddingY={2}
          boxShadow="md"
          borderRadius={30}
          bgColor={"green.300"}
          ml={10}
          mb={1}
        >
          <Heading fontSize={"20px"} color={"gray.700"}>
            {props.question ? props.question : null}
          </Heading>
        </Card>
      </Flex>
      {/* <CardHeader>
       
      </CardHeader> */}{" "}
      <Flex direction={"row"}>
        <Card
          boxShadow="md"
          borderRadius={5}
          bg={"gray.300"}
          bgSize={"contain"}
          mb={2}
        >
          <CardBody>
            <Stack divider={<StackDivider />}>
              <Box>
                <ReactMarkdown
                  components={ChakraUIRenderer(newTheme)}
                  children={props.answer ? `${props.answer}` : ""}
                  skipHtml
                />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Flex>
      <Text ml={0.5} color={"gray.400"}>
        {props.time}
      </Text>
    </Flex>
  );
}
