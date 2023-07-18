import React, { useEffect } from "react";
import { PresentationControls, Stage, Text } from "@react-three/drei";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, Plane, useTexture } from "@react-three/drei";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  Container,
  Stack,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, useAnimation } from "framer-motion";
const Hero = () => {
  const breakPoint = useMediaQuery("(min-width:900px)");
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
    <Box height={{ xs: "100%", sm: "100%", md: "90vh" }} width="100%">
      <Grid container>
        {!breakPoint && (
          <Grid
            item
            container
            sm={12}
            md={6}
            align="center"
            order={{ xs: 1, sm: 1, md: 1 }}
          >
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
                        HELLO, I'M SUNNY PATEL
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

                    <Box>
                      <Stack direction="column">
                        <Typography
                          color={theme.palette.primary.main}
                          variant="h2"
                          fontWeight={700}
                          align="left"
                          marginBottom={1}
                        >
                          Software Developer based outside of Chicago
                        </Typography>
                        <Link
                          to={"/contact"}
                          style={{ textDecoration: "none" }}
                          align="left"
                        >
                          <Button
                            color="primary"
                            variant="outlined"
                            startIcon={<EmailIcon />}
                            sx={{
                              color: theme.palette.text.primary,
                              marginBottom: 1,
                            }}
                          >
                            <Box>
                              <Typography>Contact Me</Typography>
                            </Box>
                          </Button>
                        </Link>
                      </Stack>

                      <Box
                        display={"flex"}
                        height={1}
                        justifyContent={{ xs: "center", md: "flex-start" }}
                      >
                        <Box
                          component={LazyLoadImage}
                          src="/images/headshot.jpg"
                          alt="Background Image"
                          width={1}
                          paddingX={0}
                          sx={{ borderRadius: "10%" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Grid>
        )}
        {breakPoint && (
          <Grid
            item
            container
            sm={12}
            md={12}
            align="center"
            order={{ xs: 1, sm: 1, md: 2 }}
          >
            <Box
              sx={{
                height: { xs: "50svh", sm: "50svh", md: "90svh" },
                width: { xs: "100%", sm: "100%", md: "100%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  height: { xs: "100%", sm: "100%", md: "100%" },
                  width: { xs: "100%", sm: "100%", md: "100%" },
                }}
              >
                <Canvas>
                  <Model />
                </Canvas>
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

function Model(props) {
  const depthMaterial = useRef();
  const texture = useTexture("/images/color-image.jpg");
  const depthMap = useTexture("/images/depth-image.png");
  const { viewport } = useThree();
  useFrame(
    (state) =>
      (depthMaterial.current.uMouse = [
        state.mouse.x * 0.02,
        state.mouse.y * 0.04,
      ])
  );
  return (
    <Plane args={[1, 1]} scale={[viewport.width, viewport.height, 1]}>
      <pseudo3DMaterial
        ref={depthMaterial}
        uImage={texture}
        uDepthMap={depthMap}
      />
    </Plane>
  );
}
extend({
  Pseudo3DMaterial: shaderMaterial(
    { uMouse: [0, 0], uImage: null, uDepthMap: null },
    `
    varying vec2 vUv;
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;
      vUv = uv;
    }`,
    `
    precision mediump float;

    uniform vec2 uMouse;
    uniform sampler2D uImage;
    uniform sampler2D uDepthMap;

    varying vec2 vUv;
  
    vec4 linearTosRGB( in vec4 value ) {
      return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
    }
    
    
    void main() {
       vec4 depthDistortion = texture2D(uDepthMap, vUv);
       float parallaxMult = depthDistortion.r;

       vec2 parallax = (uMouse) * parallaxMult;

       vec4 original = texture2D(uImage, (vUv + parallax));
       gl_FragColor = linearTosRGB(original);
    }
    `
  ),
});
export default Hero;
