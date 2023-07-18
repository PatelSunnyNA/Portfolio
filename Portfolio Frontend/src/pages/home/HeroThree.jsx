import React, { Suspense, useEffect } from "react";
import { Loader, PresentationControls, Stage, useProgress } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  Container,
  Stack,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Model } from "./Scene";
import { motion, useAnimation } from "framer-motion";
const HeroThree = () => {
  const theme = useTheme();
  const isLoading = false;
  const controls = useAnimation();

  useEffect(() => {
    if (!isLoading) {
      controls.start((i) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1 + 1.2 },
      }));
    } else {
      controls.start({ opacity: 0, y: 5 });
    }
  }, [isLoading, controls]);
  return (
    <Box height="100vh" width="100%">
      <Grid container>
        <Grid item container sm={12} md={6} align="center">
          <Box width={1} height={1} display="flex" alignItems="center">
            <Container>
              <Box>
                <Box marginBottom={2}>
                  <Stack direction="row" alignContent="center">
                    <Typography
                      color={theme.palette.text.primary}
                      variant="h2"
                      fontWeight={700}
                      alignSelf="center"
                      justifyContent="center"
                    >
                      Hello !
                    </Typography>
                    <Typography
                      component={motion.div}
                      animate={controls}
                      custom={0}
                      color="primary"
                      variant="h2"
                      align="justify"
                      style={{ marginBottom: "10px" }}
                    >
                      <motion.div
                        layout
                        style={{
                          originX: 0.8,
                          originY: 0.8,
                          display: "inline-block",
                        }}
                        animate={{ rotate: [0, 90, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.4,
                          repeatDelay: 0.7,
                        }}
                      >
                        👋
                      </motion.div>
                    </Typography>
                  </Stack>

                  <Typography
                    color={theme.palette.primary.main}
                    variant="h2"
                    fontWeight={700}
                    align="justify"
                    marginBottom={3}
                  ></Typography>
                </Box>
                <Box marginBottom={3}>
                  <Typography
                    variant="h6"
                    color={theme.palette.text.secondary}
                    align="justify"
                  >
                    <Stack
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                      gap={0.5}
                    >
                      Get in touch
                      <IconButton
                        aria-label="Github"
                        href="#"
                        target="_blank"
                        size="small"
                        sx={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        <GitHubIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        aria-label="LinkedIn"
                        href="#"
                        target="_blank"
                        size="small"
                        sx={{
                          color: theme.palette.primary.main,
                        }}
                      >
                        <LinkedInIcon fontSize="large" />
                      </IconButton>
                    </Stack>
                  </Typography>
                </Box>
              </Box>
            </Container>
          </Box>
        </Grid>
        <Grid item container sm={12} md={6} align="center">
          <Box
            sx={{
              height: { xs: "60svh", sm: "60svh", md: "90svh" },
              width: { xs: "100%", sm: "100%", md: "100%" },
            }}
          >
            <Canvas dpr={[1, 2]}>
              <color
                attach="background"
                args={[theme.palette.mode == "dark" ? "#1E1E1E" : "#FFFFFF"]}
              />
              <PresentationControls
                speed={1.5}
                global
                polar={[-0.2, Math.PI / 4]}
                rotation={[Math.PI / 24, -(Math.PI + Math.PI / 4), 0]}
              >
                <Stage
    
                  adjustCamera={1.25}
                >
                  <Suspense fallback={<ProgressLoader/>}>
                    <Model />
                  </Suspense>
                </Stage>
              </PresentationControls>

            </Canvas>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
function ProgressLoader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <>{progress} % loaded</>
}

export default HeroThree;
