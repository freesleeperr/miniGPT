import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/styles.css";
import { extendTheme } from "@chakra-ui/react";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} bgColor={"blue.200"} />
    </ChakraProvider>
  );
}
