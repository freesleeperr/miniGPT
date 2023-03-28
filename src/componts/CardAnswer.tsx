import {
  Text,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
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
        <Text fontSize={"15px"} color="gray.700">
          {children}
        </Text>
      );
    },
  };
  return (
    <>
      <Card
        padding={1}
        boxShadow="md"
        borderRadius={8}
        bgColor={"yellow.300"}
        mb={15}
        marginX={3}
        minWidth={"380px"}
      >
        <CardHeader>
          <Heading fontSize={"20px"} color={"blue.400"}>
            {props.question ? props.question : null}
          </Heading>
        </CardHeader>
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
    </>
  );
}
