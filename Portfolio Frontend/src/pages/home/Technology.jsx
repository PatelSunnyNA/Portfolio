import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { setTech } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import TechItem from "../../components/TechItem";

const Technology = () => {

  const baseURL = process.env.REACT_APP_BASE_URL;
  const imgURL = process.env.REACT_APP_DEV_IMAGE_URL;
  const theme = useTheme();
  const tech = useSelector((state) => state.project.technology);
  const breakPoint = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  async function getItems() {
    const items = await fetch(`${baseURL}/api/technologies?populate=avatar`, {
      method: "GET",
    });
    const itemsJson = await items.json();
    dispatch(setTech(itemsJson.data));
  }
  const languageData = React.useMemo(() => {
    let computedProjects = tech;
    computedProjects = computedProjects.filter((item) =>
      item.attributes.category.toLowerCase().includes("language")
    );
    return computedProjects;
  }, [tech]);
  const frameworkData = React.useMemo(() => {
    let computedProjects = tech;
    computedProjects = computedProjects.filter((item) =>
      item.attributes.category.toLowerCase().includes("framework")
    );
    return computedProjects;
  }, [tech]);
  const databaseData = React.useMemo(() => {
    let computedProjects = tech;
    computedProjects = computedProjects.filter((item) =>
      item.attributes.category.toLowerCase().includes("database")
    );

    return computedProjects;
  }, [tech]);
  const toolData = React.useMemo(() => {
    let computedProjects = tech;
    computedProjects = computedProjects.filter((item) =>
      item.attributes.category.toLowerCase().includes("tool")
    );

    return computedProjects;
  }, [tech]);
  const otherData = React.useMemo(() => {
    let computedProjects = tech;
    computedProjects = computedProjects.filter((item) =>
      item.attributes.category.toLowerCase().includes("other")
    );

    return computedProjects;
  }, [tech]);
  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Box width={1} margin="0 auto" paddingX={2} paddingY={4}>
        <Box>
          <Box marginBottom={4}>
            <Divider>
              <Typography
                variant="h1"
                align="center"
                fontWeight={700}
                marginTop={theme.spacing(1)}
                gutterBottom
              >
                Technologies
              </Typography>
            </Divider>

            <Typography
              variant="body1"
              align="center"
              color={theme.palette.text.secondary}
              data-aos="fade-up"
              marginTop={1}
            >
              The tools I use for my personal and professional projects
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box width={0.8}>
              <Grid container justifyContent="space-evenly">
                <Grid item xs={12} md={12}>
                  <Grid item container alignItems="center">
                    <Grid item xs={12} align="center">
                          <Divider textAlign="left">
                            <Typography variant="h3">Languages</Typography>
                          </Divider>
                    </Grid>
                    <Grid item container xs={12}>
                      {languageData.map((item, i) => (
                        <Grid item xs={4} md={3} key={i}>
                          <TechItem item={item} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="start"
                    justifyContent="flex-start"
                    xs={12}
                  >
                    <Grid item xs={12} align="center">
                      <Divider textAlign="left" light>
                        <Typography variant="h3">Frameworks</Typography>
                      </Divider>
                    </Grid>
                    {frameworkData.map((item, i) => (
                      <Grid item xs={4} md={3} key={i}>
                        <TechItem item={item} />
                      </Grid>
                    ))}
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justifyContent="flex-start"
                    xs={12}
                  >
                    <Grid item xs={12} align="center">
                      <Divider textAlign="left">
                        <Typography variant="h3">Databases & Tools</Typography>
                      </Divider>
                    </Grid>
                    {databaseData.map((item, i) => (
                      <Grid item xs={4} md={3} key={i}>
                        <TechItem item={item} />
                      </Grid>
                    ))}
                    {toolData.map((item, i) => (
                      <Grid item xs={4} md={3} key={i}>
                        <TechItem item={item} />
                      </Grid>
                    ))}
                  </Grid>
                  {/* <Grid item container justifyContent="flex-start" xs={12}>
                <Grid item xs={1}>
                  <Typography variant="h3">Languages</Typography>
                </Grid>
                {toolData.map((item, i) => (
                  <Grid item xs={1} md={1} key={i}>
                    <TechItem item={item} />
                  </Grid>
                ))}
              </Grid>
              <Grid item container justifyContent="flex-start" xs={12}>
                <Grid item xs={1}>
                  <Typography variant="h3">Languages</Typography>
                </Grid>
                {otherData.map((item, i) => (
                  <Grid item xs={3} md={2} key={i}>
                    <TechItem item={item} />
                  </Grid>
                ))}
              </Grid> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Technology;
