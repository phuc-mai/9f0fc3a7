import { Box, Typography, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";

import Feed from "./Feed";

const Menu = () => {
  const theme = useTheme();

  const options = ["All", "Missed", "Archived"];
  const [selectedOption, setSelectedOption] = useState("All");

  return (
    <Box
      sx={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.layer2,
        borderRadius: "20px 20px 0 0",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          padding: "10px 35px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {options.map((option) => (
          <Typography
            onClick={() => setSelectedOption(option)}
            key={option}
            sx={{
              position: "relative",
              color:
                selectedOption === option
                  ? theme.palette.typography.title
                  : theme.palette.typography.menu,
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              paddingBottom: "7px",
              "&::after": {
                content: '""',
                position: "absolute",
                left: "50%",
                bottom: 0,
                width: selectedOption === option ? "100%" : "0%",
                height: "4px",
                borderRadius: "4px",
                backgroundColor: red[500],
                transition: "width 0.3s ease-in-out",
                transform: "translateX(-50%)",
              },
              "&:hover::after": {
                width: "100%",
              },
            }}
          >
            {option}
          </Typography>
        ))}
      </Box>
      <Feed option={selectedOption} />
    </Box>
  );
};

export default Menu;
