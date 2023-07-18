import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, Card, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Navbar from "./pages/global/Navbar";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import ProjectDetails from "./pages/projectDetails/ProjectDetails";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blogDetails/BlogDetails";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Footer from "./pages/global/Footer";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Box width={1}>
            <ScrollToTop />
            <Navbar />
            <main className="content">
              <Box
                mt="65px"
                justifyContent="center"
                alignItems="center"
                display="flex"
                width={"100%"}
              >
                <Box width="90%" display="flex" justifyContent="center">
                  <Box minWidth={"100%"}  minHeight={"100%"}>
                    <Card width="100%">
                      <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/projects" element={<Projects />} />
                        <Route
                          exact
                          path="/projects/:slug"
                          element={<ProjectDetails />}
                        />
                        <Route exact path="/blog" element={<Blog />} />
                        <Route
                          exact
                          path="/blog/:slug"
                          element={<BlogDetails />}
                        />
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/contact" element={<Contact />} />
                      </Routes>
                    </Card>
                  </Box>
                </Box>
              </Box>
            </main>
            <Footer />
          </Box>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
