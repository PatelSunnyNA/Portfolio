import {
  Box,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TechItem = ({ item }) => {

  const baseURL = process.env.REACT_APP_BASE_URL;
  const theme = useTheme();
  const breakPoint = useMediaQuery("(min-width:600px)");

  return (
    <Tooltip title={`${item?.attributes?.name}`}>
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component={LazyLoadImage}
          align="center"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          src={`${baseURL}${item?.attributes?.avatar?.data?.attributes?.url}`}
          alt="Tech Image"
          height={{ xs: 45 }}
          width={{ xs: 45 }}
        />

        {/* {breakPoint && (
        <Typography
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          variant="subtitle1"
          color={theme.palette.text.primary}
          fontWeight="bold"
          my="2px"
        >
          {item.attributes.name}
        </Typography>
      )} */}
      </Box>
    </Tooltip>
  );
};

export default TechItem;
