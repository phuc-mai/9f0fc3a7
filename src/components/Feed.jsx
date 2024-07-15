import { Box, Button, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CallCard from "./CallCard";
import CallCardSkeleton from "./CallCardSkeleton";

const Feed = ({ option }) => {
  const theme = useTheme();

  const [callList, setCallList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/activities`);
      const data = await res.json();

      let filteredData = [];

      if (option === "All") {
        filteredData = data.filter((call) => !call.is_archived);
      } else if (option === "Archived") {
        filteredData = data.filter((call) => call.is_archived);
      } else if (option === "Missed") {
        filteredData = data.filter((call) => call.call_type === "missed" && !call.is_archived);
      }

      setCallList(filteredData);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateArchiveStatus = async (id, is_archived, updateState = true) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/activities/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_archived: !is_archived,
          }),
        }
      );
      const data = await res.text();
      if (data !== "Call had been updated.") {
        throw new Error("Error updating archive status.");
      }
      setCallList(callList.filter((call) => call.id !== id));
    } catch (error) {
      console.log("Error updating archive status:", error);
    }
  };

  const resetCalls = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/reset`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.text();
      if (data !== "All calls have been reset.") {
        throw new Error("Error while resetting calls.");
      }
    } catch (error) {
      console.log("Error while resetting calls:", error);
    }
  };

  const handleArchiveClick = async () => {
    switch (option) {
      case "All":
        await Promise.all(
          callList.map(async (call) => {
            await updateArchiveStatus(call.id, false);
          })
        );
        break;
      case "Archived":
        resetCalls();
        break;
      default:
        break;
    }
    setCallList([]);
  };

  useEffect(() => {
    getFeed();
  }, [option]);

  return (
    <Box
      sx={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: theme.palette.background.layer3,
        borderRadius: "20px 20px 0 0",
        overflowY: "auto",
      }}
    >
      {option !== "Missed" && (
        <Button
          variant="contained"
          size="small"
          sx={{ width: "120px", marginBottom: "10px" }}
          onClick={() => handleArchiveClick()}
        >
          {option === "All" ? "Archive" : "Unarchive"} All
        </Button>
      )}
      {loading ? (
        <CallCardSkeleton />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {callList.map((call) => (
            <CallCard
              key={call.id}
              id={call.id}
              updateArchiveStatus={updateArchiveStatus}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Feed;
