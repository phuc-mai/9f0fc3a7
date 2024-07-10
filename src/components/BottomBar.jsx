import {
  DialpadOutlined,
  Person,
  Phone,
  Settings,
  Sms,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";

const icons = [
  { component: Phone, title: "Calls", path: "/" },
  { component: Sms, title: "Chats", path: "/chats" },
  {
    component: DialpadOutlined,
    title: "Dialpad",
    path: "/dial",
    special: true,
  },
  { component: Person, title: "Contacts", path: "/contacts" },
  { component: Settings, title: "Settings", path: "/settings" },
];

const BottomBar = () => {
  const theme = useTheme();

  const location = useLocation();

  return (
    <Box
      sx={{
        padding: "8px 10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {icons.map((icon, index) => {
        const IconComponent = icon.component;

        if (icon.special) {
          return (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "40px",
                height: "40px",
                padding: "2px",
                border: "1px",
                borderRadius: "50%",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "30%",
                  transform: "scale(1.5)",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                <IconComponent />
              </IconButton>
            </Box>
          );
        }

        return (
          <Tooltip key={index} title={icon.title}>
            <IconButton>
              <IconComponent
                sx={{
                  color:
                    location.pathname === icon.path
                      ? theme.palette.typography.title
                      : theme.palette.typography.menu,
                }}
              />
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default BottomBar;
