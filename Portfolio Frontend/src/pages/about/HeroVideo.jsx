import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import ReactPlayer from "react-player";
import heroVideo from "../../assets/herovid.mp4";

const HeroVideo = () => {
  const theme = useTheme();
  return (
    <Box position="relative">
      <Box width={1} margin="0 auto" paddingX={1} paddingY={1} height="80vh">
        <Box sx={{ position: "relative" }}>
          <div className="player-wrapper">
            <ReactPlayer
            className="react-player"
              url={heroVideo}
              playing
              loop
              muted
              width="100%"
              height="100%"
            />
          </div>
          <Box alignItems="center" justifyContent="center" display="flex">


            <Box alignItems="center" justifyContent="center" display="flex">
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.33)",
                  color: "white",
                }}
              >
                <Box
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  color="#fff"
                >
                  <Typography
                    color={theme.palette.text.primary}
                    variant="h2"
                    fontWeight={700}
                    align="center"
                  >
                    Welcome to
                  </Typography>
                  <Typography
                    color={theme.palette.text.primary}
                    variant="h2"
                    fontWeight={700}
                    align="center"
                    marginBottom={3}
                  >
                    Sunny's Portfolio
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroVideo;
