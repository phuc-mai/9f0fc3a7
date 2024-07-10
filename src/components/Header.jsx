import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import useThemeStore from "../hooks/useThemeStore";

const Header = () => {
  const theme = useTheme();
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  return (
    <Box
      sx={{
        padding: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <Box width="60px" height="60px">
          <img
            src="/assets/profile.png"
            alt="Avatar"
            width="60px"
            height="60px"
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </Box>
        <Box>
          <Typography
            fontSize="20px"
            color={theme.palette.typography.title}
            fontWeight="700"
          >
            Phuc Mai{" "}
          </Typography>
          <Typography
            fontSize="12px"
            color={theme.palette.typography.subtitle}
            fontWeight="500"
          >
            "Work hard, Play harder"
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <IconButton
          onClick={toggleMode}
          sx={{
            color: theme.palette.icon,
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          {mode === "light" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
