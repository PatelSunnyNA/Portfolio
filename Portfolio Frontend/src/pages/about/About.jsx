import { Box } from "@mui/material";
import React from "react";
import AboutMe from "./AboutMe";
import FAQ from "./FAQ";
const About = () => {
  return (
    <Box width={1} margin="0 auto" paddingX={2} paddingY={2}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box width={1}>
          <AboutMe />
        </Box>
      </Box>
    </Box>
  );
};

export default About;
