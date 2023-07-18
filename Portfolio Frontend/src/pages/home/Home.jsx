import { Box } from "@mui/material";
import React from "react";
import FeaturedProjects from "./FeaturedProjects";
import HeroThree from "./HeroThree";
import Technology from "./Technology";
import FeaturedBlogs from "./FeaturedBlogs";
import { Suspense } from "react";
import Hero from "./Hero";
const Home = () => {
  return (
    <Box width={1} margin="0 auto" paddingX={2} paddingY={2}>
      <Box
        display="flex"
        width={"100%"}
        alignItems="center"
        justifyContent="center"
      >
        <Box minWidth={"100%"} minHeight={"100%"}>
          <Box>
            <Box>
              <Hero />
            </Box>
            <FeaturedProjects />
            <Technology />
            <FeaturedBlogs />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
