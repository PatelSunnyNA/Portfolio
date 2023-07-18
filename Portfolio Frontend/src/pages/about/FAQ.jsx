import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const theme = useTheme();
  return (
    <Box width={1} paddingX={1} mt="10px">
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography variant="h5">LIS Analyst MAY 2021 - AUG 2021</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography>
            
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography variant="h5">Solo Project</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography variant="h5">Student Systems Analyst II</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default FAQ;
