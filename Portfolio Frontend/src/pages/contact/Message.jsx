import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
const Message = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const handleFormSubmit = (values) => {
    fetch(`${baseURL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          name: values.firstName + " " + values.lastName,
          email: values.email,
          subject: values.subject,
          content: values.message,
        },
      }),
    })
      .then((response) => response.json())
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12} marginBottom={1} >
        <Divider>
          <Typography variant="h1" align="center" fontWeight={700}>
            Get in Touch
          </Typography>
        </Divider>
      </Grid>
        <Grid item xs={12} md={3} >
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
        </Grid>
      <Grid item container xs={12} sm={6} md={3}>
          <Stack>
            <Box
              m={1} //margin
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >

              <Link
                to={"https://www.linkedin.com/in/sunny-patel-na8/"}
                style={{ textDecoration: "none" }}
              >
                <Button
                  color="primary"
                  variant="text"
                  startIcon={<LinkedInIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                    mx: 1.5,
                  }}
                >
                  <Box>
                    <Typography>LinkedIn</Typography>
                  </Box>
                </Button>
              </Link>
            </Box>
            <Box
              m={1} //margin
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >

              <Link
                to={"https://github.com/PatelSunnyNA"}
                style={{ textDecoration: "none" }}
              >
                <Button
                  color="primary"
                  variant="text"
                  startIcon={<GitHubIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                    mx: 1.5,
                  }}
                >
                  <Box>
                    <Typography>Github</Typography>
                  </Box>
                </Button>
              </Link>
            </Box>
            <Box
              m={1} //margin
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >

              <Link
                to={"mailto:sunny.patel.na@gmail.com"}
                style={{ textDecoration: "none" }}
              >
                <Button
                  color="primary"
                  variant="text"
                  startIcon={<EmailIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                    mx: 1.5,
                  }}

                >
                  <Box>
                    <Typography>sunny.patel.na@gmail.com</Typography>
                  </Box>
                </Button>
              </Link>
            </Box>
            <Box
              m={1} //margin
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >

              <Link
                to={"mailto:sunny.patel.na@gmail.com"}
                style={{ textDecoration: "none" }}
              >
                <Button
                  color="primary"
                  variant="disabled"
                  startIcon={<LocationOnIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                  }}

                >
                  <Box>
                    <Typography>Bartlett, Illinois</Typography>
                  </Box>
                </Button>
              </Link>
            </Box>

          </Stack>
      </Grid>

      <Grid item xs={12} sm={6} md={6} >
        <Box display="flex" width={1}>
          <Formik
            onSubmit={(values, { resetForm }) => {
              fetch(`${baseURL}/api/messages`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    name: values.firstName + " " + values.lastName,
                    email: values.email,
                    subject: values.subject,
                    content: values.message,
                  },
                }),
              })
                .then((response) => response.json())
                .then();
              resetForm();
            }}
            initialValues={initialValues}
            validationSchema={messageSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={!!touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={!!touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Subject"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.subject}
                        name="subject"
                        error={!!touched.subject && !!errors.subject}
                        helperText={touched.subject && errors.subject}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        multiline
                        minRows={4}
                        label="Message"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.message}
                        name="message"
                        error={!!touched.message && !!errors.message}
                        helperText={touched.message && errors.message}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box
                        display="flex"
                        justifyContent={{ xs: "center", md: "flex-end" }}
                      >
                        <Button
                          type="submit"
                          color="secondary"
                          variant="contained"
                        >
                          Send Message
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

const messageSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  subject: yup.string().required("required"),
  message: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export default Message;
