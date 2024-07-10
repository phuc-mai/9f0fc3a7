export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
};

export const themeSetting = (mode) => {
  return {
    typography: {
      fontFamily: "Fredoka, Arial, sans-serif",
    },

    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            background: {
              layer1: colorTokens.grey[900],
              layer2: colorTokens.grey[800],
              layer3: colorTokens.grey[600],
            },
            typography: {
              title: colorTokens.grey[0],
              subtitle: colorTokens.grey[200],
              menu: colorTokens.grey[400],
              text: colorTokens.grey[50],
            },
            icon: colorTokens.grey[50],
            border: colorTokens.grey[500],
          }
        : {
            // palette values for light mode
            background: {
              layer1: colorTokens.grey[100],
              layer2: colorTokens.grey[50],
              layer3: colorTokens.grey[0],
            },
            typography: {
              title: colorTokens.grey[800],
              subtitle: colorTokens.grey[400],
              menu: colorTokens.grey[300],
              text: colorTokens.grey[600],
            },
            icon: colorTokens.grey[500],
            border: colorTokens.grey[50],
          }),
    },
  };
};
