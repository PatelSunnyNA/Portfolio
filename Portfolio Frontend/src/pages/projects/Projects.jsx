import React, { useEffect, useState } from "react";
import { Box, useTheme, Typography, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, setTech } from "../../state";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ProjectCard from "../../components/ProjectCard";
import useMediaQuery from "@mui/material/useMediaQuery";

const Projects = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const theme = useTheme();
  const projects = useSelector((state) => state.project.projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortFilter, setSortFilter] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const breakPoint = useMediaQuery("(min-width:600px)");
  const projectsPerPage = 6;
  const pageNumbers = [];
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  async function getItems() {
    const items = await fetch(
      `${baseURL}/api/projects?populate=coverImage&populate=technologies&sort=createdAt:desc`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setProjects(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }
  const projectData = React.useMemo(() => {
    let computedProjects = projects;
    if (currentTab === "all") {
      computedProjects = projects;
    }
    if (searchTerm) {
      computedProjects = computedProjects.filter((item) =>
        item.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setTotalProjects(computedProjects.length);
    //Current Page slice
    return computedProjects.slice(
      (currentPage - 1) * projectsPerPage,
      (currentPage - 1) * projectsPerPage + projectsPerPage
    );
  }, [projects, currentPage, searchTerm, currentTab]);
  // Change page
  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const resetFilter = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };
  return (
    <Box width={1} margin="0 auto" paddingX={2} paddingY={2}>
      <Box display="flex" width={1} alignItems="center" justifyContent="center">
        <Box minWidth={"100%"} minHeight={"100%"}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="h1" align="center" fontWeight={700}>
                  Projects
                </Typography>
              </Divider>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item xs={12} md={5}>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Projects"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    value={searchTerm}
                  />
                  {searchTerm === "" && (
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      disabled
                    >
                      <SearchIcon />
                    </IconButton>
                  )}
                  {searchTerm !== "" && (
                    <IconButton
                      type="button"
                      sx={{ p: "10px" }}
                      aria-label="search"
                      onClick={resetFilter}
                    >
                      <SearchIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              xs={12}
              sm={12}
              md={12}
            >
              <Grid
                item
                container
                spacing={4}
                justifyContent="flex-start"
                alignItems="center"
              >
                {projectData.map((item, i) => (
                  <Grid key={i} item xs={12} sm={12} md={4}>
                    <ProjectCard project={item} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {pageNumbers.length > 1 && (
                <Box
                  my="10px"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={pageNumbers.length}
                      page={currentPage}
                      onChange={paginate}
                    />
                  </Stack>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Projects;
