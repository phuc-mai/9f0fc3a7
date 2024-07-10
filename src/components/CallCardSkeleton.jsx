import { Box, Skeleton, useTheme } from "@mui/material";
import React from "react";

export default function CallCardSkeleton() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "8px 0",
        borderBottom: `1px solid ${theme.palette.border}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Box sx={{ marginLeft: "15px" }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
              <Skeleton width="50px" />
              <Skeleton width="100px" />
            </Box>
            <Skeleton width="150px" />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton width="30px" />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
      </Box>
    </Box>
  );
}
