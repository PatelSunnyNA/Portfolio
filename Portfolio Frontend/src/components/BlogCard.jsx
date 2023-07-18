import {
  Box,
  Card,
  CardMedia,
  CardActionArea,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const breakPoint = useMediaQuery("(min-width:900px)");
  const theme = useTheme();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <Box
      sx={{ flexGrow: 1, display: "flex" }}
      justifyContent="center"
      alignItems="center"
    >
      <Card>
        <Box
          sx={{ position: "relative" }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <CardActionArea
            component={Link}
            to={"/blog/" + post.attributes.slug}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                mt: "5px",
                ml: "5px",
              }}
            >
            </Box>
            <CardMedia
              component="img"
              color="textSecondary"
              height={{
                xs: `${post?.attributes?.coverImage?.data?.attributes?.formats?.small?.height}`,
                sm: `${post?.attributes?.coverImage?.data?.attributes?.formats?.small?.height}`,
                md: `${post?.attributes?.coverImage?.data?.attributes?.formats?.medium?.height}`,
              }}
              width={{
                xs: `${post?.attributes?.coverImage?.data?.attributes?.formats?.small?.width}`,
                sm: `${post?.attributes?.coverImage?.data?.attributes?.formats?.small?.width}`,
                md: `${post?.attributes?.coverImage?.data?.attributes?.formats?.medium?.width}`,
              }}
              image={`${baseURL}${post?.attributes?.coverImage?.data?.attributes?.formats?.medium?.url}`}
            />
          </CardActionArea> 
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              bgcolor: "rgba(0, 0, 0, 0.9)",
              color: "white",
              padding: "10px",
            }}
          >
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Box sx={{ flexGrow: 1, display: "flex" }} alignItems="center">
                <Typography color="text" variant="h4" mx="10px">
                  {post?.attributes?.title}
                </Typography>
              </Box>

              <Box
                sx={{ flexGrow: 1, display: "flex" }}
                justifyContent="flex-end"
                alignItems="center"
              >
              </Box>
            </Box>
            {breakPoint && isHovering && (
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Typography color="text" variant="subtitle1" mx="10px">
                  {post.attributes.description}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default BlogCard;
