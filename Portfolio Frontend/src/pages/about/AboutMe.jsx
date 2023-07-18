import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const AboutMe = () => {
  return (
    <Box width={1}>
      <Grid container>
        <Grid item xs={12} paddingY={3}>
          <Divider>
            <Typography variant="h1" align="center" fontWeight={700}>
              About Me
            </Typography>
          </Divider>
        </Grid>
        <Grid item order={{ xs: 2, sm: 2, md: 1 }} xs={12} md={6}>
          <Typography align="left" paddingX={2} paddingY={1} fontSize={18}>
            Hey there! 👋. I'm Sunny, a developer based outside of Chicago, that
            loves to code and build innovative software solutions. I studied
            Computer Science at the Univeristy of Iowa. From my sophmore year, I
            led the development of the high voltage drivetrain and vehicle
            control systems for the Iowa Formula Racing team where I truly fell
            in love with the engineering and development process. Automation,
            improving efficency, and building meaningful user-centric products
            are a passion of mine. Outside of work, I enjoy playing guitar,
            cooking, longboarding, and working on the perpetual project that is
            owning a 90's JDM convertible.
          </Typography>
        </Grid>
        <Grid item order={{ xs: 1, sm: 1, md: 2 }} xs={12} md={6}>
          <Box
            display={"flex"}
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Box
              component={LazyLoadImage}
              src="/images/color-about.jpg"
              alt="Background Image"
              width={1}
              paddingX={1}
              paddingY={1}
              sx={{ borderRadius: "10%" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutMe;
