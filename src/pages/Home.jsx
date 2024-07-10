import { Box, useTheme } from "@mui/material";

import Header from "../components/Header";
import Menu from "../components/Menu";
import BottomBar from "../components/BottomBar";

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#233142"
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.layer1,
          width: "376px",
          height: "620px",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Menu />
        <BottomBar />
      </Box>
    </Box>
  );
};

export default HomePage;
