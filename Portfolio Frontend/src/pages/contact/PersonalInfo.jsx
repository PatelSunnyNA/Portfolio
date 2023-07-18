import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Map from "./Map";

const PersonalInfo = () => {
  return (
    <Box width={1} position="relative">
      <Box width={1} margin="0 auto" paddingY={2} display="flex">
        <Grid container>
          <Grid item xs={12} md={12}>
            <Map coordinates={[41.9909, -88.1847]} zoom={10} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
