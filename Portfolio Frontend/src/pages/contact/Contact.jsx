import { Box, Divider } from "@mui/material";
import React from "react";
import Message from "./Message";
import PersonalInfo from "./PersonalInfo";

const Contact = () => {
  return (
    <Box width={1} margin="0 auto" paddingX={2} paddingY={2}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box width={1}>
          <Message />
          <Box width={1}>
            <PersonalInfo />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
