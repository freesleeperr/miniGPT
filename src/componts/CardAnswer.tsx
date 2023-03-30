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
}
export default function MyCard(props: IProps) {
  const newTheme = {
    p: (props: any) => {
      const { children } = props;
      return (
        <Text lineHeight={"27px"} fontSize={"17px"} color="gray.900">
          {children}
        </Text>
      );
    },
  };
  return (
    <Flex
      width={{ base: "360px", md: "800px", lg: "1200px" }}
      justifyItems={"start"}
      direction={"column"}
      mb={10}
    >
      <Flex direction={"row-reverse"}>
        <Card
          padding={2}
          boxShadow="md"
          borderRadius={8}
          bgColor={"green.400"}
          mb={2}
          ml={10}
        >
          <Heading fontSize={"20px"} color={"white"}>
            {props.question ? props.question : null}
          </Heading>
        </Card>
      </Flex>
      {/* <CardHeader>
       
      </CardHeader> */}{" "}
      <Flex direction={"row"}>
        <Card
          boxShadow="md"
          borderRadius={8}
          bg={"gray.200"}
          bgSize={"contain"}
          mb={2}
        >
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
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
    </Flex>
  );
}
