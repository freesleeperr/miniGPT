import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "30em",
  md: "55em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};
const theme = extendTheme({ breakpoints });

export default theme;
