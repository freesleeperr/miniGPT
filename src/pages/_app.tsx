import type { AppProps } from "next/app";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "styles/styles.css";
import { extendTheme } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  const breakpoints = {
    sm: "30em",
    md: "60em",
    lg: "80em",
  };
  const theme = extendTheme({ breakpoints, ...breakpoints });
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
