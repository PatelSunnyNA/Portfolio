import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MuiMarkdown from "mui-markdown";
import { useDispatch } from "react-redux";
import { Image } from "mui-image";
import CodeIcon from "@mui/icons-material/Code";
import PublicIcon from "@mui/icons-material/Public";

const ProjectDetails = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();

  const theme = useTheme();
  const { slug } = useParams();
  const [item, setItem] = useState(null);

  async function getProject() {
    const response = await fetch(
      `${baseURL}/api/projects/${slug}?populate=coverImage`,
      {
        method: "GET",
      }
    );
    const itemJson = await response.json();
    setItem(itemJson.data);
  }

  useEffect(() => {
    getProject();
  }, [slug]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        padding={3}
      >
        <Grid
          item
          container
          justifyContent="space-between"
          alignContent="center"
          xs={12}
        >
          <Typography variant="h1" my="10px">
            {item?.attributes?.title}
          </Typography>
          <Stack
            direction={{ md: "row" }}
            my="10px"
            gap={1}
            alignItems="flex-end"
          >
            {item?.attributes.source && (
              <Link
                to={item?.attributes.source}
                style={{ textDecoration: "none" }}
                align="left"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<CodeIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                    marginBottom: 1,
                  }}
                >
                  <Box>
                    <Typography>source</Typography>
                  </Box>
                </Button>
              </Link>
            )}
            {item?.attributes.demo && (
              <Link
                to={item?.attributes.demo}
                style={{ textDecoration: "none" }}
                align="left"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<CodeIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                    marginBottom: 1,
                  }}
                >
                  <Box>
                    <Typography>Live Demo</Typography>
                  </Box>
                </Button>
              </Link>
            )}
          </Stack>
        </Grid>

        <Divider style={{ width: "100%" }} />

        <Grid item container alignItems="stretch" xs={12} md={12}>
          <Image
            style={{
              marginTop: "10px",
              width: "65%",
              height: "50%",
              marginBottom: "10px",
            }}
            src={`${baseURL}${item?.attributes?.coverImage?.data?.attributes?.formats?.large?.url}`}
          />
        </Grid>


        <Divider style={{ width: "100%" }} />
        <Grid item xs={12}>
          <Box my={5}>
            <MuiMarkdown
              overrides={{
                img: {
                  component: Image,
                  props: {
                    width: "80%",
                    shift: "bottom",
                    shiftduration: "600",
                    duration: "500",
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                      marginBottom: "10px",
                    },
                  },
                },
                p: {
                  component: Typography,
                  props: {
                    style: {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  },
                },
              }}
            >
              {item?.attributes?.content}
            </MuiMarkdown>
          </Box>
        </Grid>
      </Grid>
      <Box></Box>
    </Box>
  );
};

export default ProjectDetails;
