import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";

import useThemeStore from "./hooks/useThemeStore";
import { themeSetting } from "./theme";
import HomePage from "./pages/Home";


function App() {
  const mode = useThemeStore((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSetting(mode)), [mode])
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
