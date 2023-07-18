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
import { setPosts } from "../../state";

import BlogCard from "../../components/BlogCard";
import { Link } from "react-router-dom";
const FeaturedBlogs = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const theme = useTheme();
  const projects = useSelector((state) => state.project.posts);
  const dispatch = useDispatch();
  async function getItems() {
    const items = await fetch(
      `${baseURL}/api/posts?pagination[start]=0&pagination[limit]=3&populate=coverImage&populate=technologies&filters[isFeatured][$eq]=true`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    dispatch(setPosts(itemsJson.data));
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
              Blog
            </Typography>
          </Divider>
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
              <BlogCard post={item} />
            </Grid>
          ))}

          <Grid item xs={12} align="center">
            <Link to={"/blog"} style={{ textDecoration: "none" }}>
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
                  <Typography>All Posts</Typography>
                </Box>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturedBlogs;
