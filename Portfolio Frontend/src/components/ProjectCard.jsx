import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Chip,
  useTheme,
  Typography,
  Tooltip,
  useMediaQuery,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";
import PublicIcon from "@mui/icons-material/Public";
import CheckIcon from "@mui/icons-material/Check";
import ConstructionIcon from "@mui/icons-material/Construction";

import { LazyLoadImage } from "react-lazy-load-image-component";
const ProjectStatus = ({ status }) => {
  return (
    <Box>
      {status === "complete" && (
        <Chip
          label={
            <Stack direction="row" alignItems="center" gap={0.5}>
              <CheckIcon />
              <Typography variant="body1">COMPLETE</Typography>
            </Stack>
          }
          color="success"
        />
      )}
      {status === "inProgress" && (
        <Chip
          label={
            <Stack direction="row" alignItems="center" gap={0.5}>
              <ConstructionIcon />
              <Typography variant="body1">IN DEVELOPMENT</Typography>
            </Stack>
          }
          color="warning"
        />
      )}
      {status === "deployed" && (
        <Chip
          label={
            <Stack direction="row" alignItems="center" gap={0.5}>
              <PublicIcon />
              <Typography variant="body1">DEPLOYED</Typography>
            </Stack>
          }
          color="info"
        />
      )}
    </Box>
  );
};

const ProjectCard = ({ project }) => {
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
            to={"/projects/" + project.attributes.slug}
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
              <ProjectStatus status={project?.attributes?.completionStatus} />
            </Box>
            <CardMedia
              component="img"
              color="textSecondary"
              height={{
                xs: `${project?.attributes?.coverImage?.data?.attributes?.formats?.small?.height}`,
                sm: `${project?.attributes?.coverImage?.data?.attributes?.formats?.small?.height}`,
                md: `${project?.attributes?.coverImage?.data?.attributes?.formats?.medium?.height}`,
              }}
              width={{
                xs: `${project?.attributes?.coverImage?.data?.attributes?.formats?.small?.width}`,
                sm: `${project?.attributes?.coverImage?.data?.attributes?.formats?.small?.width}`,
                md: `${project?.attributes?.coverImage?.data?.attributes?.formats?.medium?.width}`,
              }}
              image={`${baseURL}${project?.attributes?.coverImage?.data?.attributes?.formats?.medium?.url}`}
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
                  {project?.attributes?.title}
                </Typography>
              </Box>

              <Box
                sx={{ flexGrow: 1, display: "flex" }}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Box mx="10px">
                  {breakPoint && (
                    <Tooltip title="Share Link">
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            window.location.href + project.attributes.slug
                          )
                        }
                      >
                        <LinkIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {breakPoint && project.attributes.source && (
                    <Tooltip title="Source Code">
                      <Link
                        to={project.attributes.source}
                        style={{ textDecoration: "none" }}
                        align="left"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton size="small">
                          <CodeIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  )}
                  {breakPoint && project.attributes.demo && (
                    <Tooltip title="Live Demo">
                      <Link
                        to={project.attributes.demo}
                        style={{ textDecoration: "none" }}
                        align="left"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton
                          onClick={() =>
                            navigator.clipboard.writeText(
                              window.location.href + project.attributes.slug
                            )
                          }
                        >
                          <PublicIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  )}
                  {!breakPoint && project.attributes.source && (
                      <Link
                        to={project.attributes.source}
                        style={{ textDecoration: "none" }}
                        align="left"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton size="small">
                          <CodeIcon />
                        </IconButton>
                      </Link>
                  )}
                  {!breakPoint && project.attributes.demo && (
                      <Link
                        to={project.attributes.demo}
                        style={{ textDecoration: "none" }}
                        align="left"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton
                          onClick={() =>
                            navigator.clipboard.writeText(
                              window.location.href + project.attributes.slug
                            )
                          }
                        >
                          <PublicIcon />
                        </IconButton>
                      </Link>
                  )}
                </Box>
              </Box>
            </Box>
            {breakPoint && isHovering && (
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <Typography color="text" variant="subtitle1" mx="10px">
                  {project.attributes.description}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProjectCard;
