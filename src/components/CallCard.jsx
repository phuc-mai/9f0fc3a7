import {
  Archive,
  ExpandLess,
  ExpandMore,
  PhoneCallback,
  PhoneForwarded,
  Unarchive,
} from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import CallCardSkeleton from "./CallCardSkeleton";

const CallCard = ({ id, updateArchiveStatus }) => {
  const theme = useTheme();

  const [callDetails, setCallDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCallDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/activities/${id}`
      );
      const data = await res.json();
      setCallDetails(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCallDetails();
  }, [id]);

  const { direction, from, via, duration, call_type, created_at, is_archived } =
    callDetails;

  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [isDetailed, setIsDetailed] = useState(false);

  return loading ? (
    <CallCardSkeleton />
  ) : (
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
          {direction === "outbound" ? (
            <PhoneForwarded sx={{ color: "#E89610" }} />
          ) : (
            <PhoneCallback sx={{ color: "#55BD24" }} />
          )}
          <Box sx={{ marginLeft: "15px" }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
              <Typography
                sx={{
                  color: theme.palette.typography.subtitle,
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {direction === "outbound" ? "to:" : "from:"}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.typography.title,
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                {from}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: theme.palette.typography.subtitle,
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              via Aircall number {via}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.typography.subtitle,
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {formattedTime}
          </Typography>
          <IconButton
            sx={{ padding: "1px" }}
            onClick={() => setIsDetailed(!isDetailed)}
          >
            {isDetailed ? (
              <ExpandLess sx={{ color: theme.palette.typography.subtitle }} />
            ) : (
              <ExpandMore sx={{ color: theme.palette.typography.subtitle }} />
            )}
          </IconButton>
        </Box>
      </Box>

      {isDetailed && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.typography.text,
                fontSize: "13px",
                fontWeight: "400",
              }}
            >
              {direction === "outbound" ? "Outgoing call" : "Incoming call"}
            </Typography>
            <Tooltip title={is_archived ? "Unarchive" : "Archive"}>
              <IconButton
                sx={{ padding: "5px" }}
                onClick={() => updateArchiveStatus(id, is_archived)}
              >
                {is_archived ? (
                  <Unarchive sx={{ color: "#F70001", fontSize: "18px" }} />
                ) : (
                  <Archive sx={{ color: "#F70001", fontSize: "18px" }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            <Typography
              sx={{
                color: theme.palette.typography.text,
                fontSize: "13px",
                fontWeight: "400",
              }}
            >
              {formattedDate}
            </Typography>
            <Typography
              sx={{
                color: theme.palette.typography.text,
                fontSize: "13px",
                fontWeight: "400",
              }}
            >
              {duration} secs
            </Typography>
            <Typography
              sx={{
                color: theme.palette.typography.text,
                fontSize: "13px",
                fontWeight: "400",
              }}
            >
              {call_type}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CallCard;
