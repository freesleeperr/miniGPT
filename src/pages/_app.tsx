import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/styles.css";
import { extendTheme } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  const breakpoints = {
    sm: "30em",
    md: "55em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  };
  const theme = extendTheme({ breakpoints });
  return (
    <ChakraProvider>
      <Component {...pageProps} bgColor={"blue.200"} />
    </ChakraProvider>
  );
}
