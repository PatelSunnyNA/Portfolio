import React, { useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../../state";
import ProjectCard from "../../components/ProjectCard";
import CodeIcon from "@mui/icons-material/Code";
import PublicIcon from "@mui/icons-material/Public";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
const FeaturedProjects = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const theme = useTheme();
  const projects = useSelector((state) => state.project.projects);
  const dispatch = useDispatch();
  async function getItems() {
    const items = await fetch(
      `${baseURL}/api/projects?pagination[start]=0&pagination[limit]=3&populate=coverImage&populate=technologies&filters[isFeatured][$eq]=true`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    dispatch(setProjects(itemsJson.data));
  }
  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box position="relative">
      <Box width={1} margin="0 auto" paddingX={2} paddingY={4}>
        <Box marginBottom={4}>
          <Divider>
            <Typography
              variant="h1"
              align="center"
              fontWeight={700}
              gutterBottom
            >
              Projects
            </Typography>
          </Divider>

          <Typography
            variant="h6"
            align="center"
            color={theme.palette.text.secondary}
            data-aos="fade-up"
            marginTop={3}
            noWrap
            marginBottom={3}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={0.5}
            >
              View the live demo
              <PublicIcon />
              or source code
              <CodeIcon />
            </Stack>
          </Typography>
        </Box>
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          paddingX={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {projects.map((item, i) => (
            <Grid key={i} item xs={12} sm={12} md={4}>
              <ProjectCard project={item} />
            </Grid>
          ))}

          <Grid item xs={12} align="center">
            <Link to={"/projects"} style={{ textDecoration: "none" }}>
              <Button
                color="primary"
                variant="outlined"
                sx={{
                  color: theme.palette.text.primary,
                  mx: 1.5,
                  mb: 1.5,
                }}
              >
                <Box>
                  <Typography>All Projects</Typography>
                </Box>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturedProjects;
