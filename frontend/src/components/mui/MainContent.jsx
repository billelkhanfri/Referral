// MainContent.js

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography sx={{ marginBottom: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam.
      </Typography>
    </Box>
  );
};

export default MainContent;
