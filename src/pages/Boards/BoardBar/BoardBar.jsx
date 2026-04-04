import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { formatcapitalizeFirstLetterter } from "~/utils/formatters";

const Menu_Style = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar({ board }) {
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflow: "auto",
        borderBottom: "1px solid #1752e9",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#30495e" : "#1976b2",
        "&::-webkit-scrollbar-track": { m: 2 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          sx={Menu_Style}
          icon={<DashboardIcon />}
          label={board?.title}
          onClick={() => {}}
        />
        <Chip
          sx={Menu_Style}
          icon={<VpnLockIcon />}
          label={formatcapitalizeFirstLetterter(board?.type)}
          onClick={() => {}}
        />
        <Chip
          sx={Menu_Style}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          onClick={() => {}}
        />
        <Chip
          sx={Menu_Style}
          icon={<BoltIcon />}
          label="Automation"
          onClick={() => {}}
        />
        <Chip
          sx={Menu_Style}
          icon={<FilterListIcon />}
          label="Filters"
          onClick={() => {}}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white" },
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: "10px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              "&:first-of-type": { bgcolor: "#a4b0be" },
            },
          }}
        >
          <Tooltip title="2909nguyenv">
            <Avatar alt="2909nguyenv" src="" />
          </Tooltip>
          <Tooltip title="2909nguyenv">
            <Avatar alt="2909nguyenv" src="" />
          </Tooltip>
          <Tooltip title="2909nguyenv">
            <Avatar alt="2909nguyenv" src="" />
          </Tooltip>
          <Tooltip title="2909nguyenv">
            <Avatar alt="2909nguyenv" src="" />
          </Tooltip>
          <Tooltip title="2909nguyenv">
            <Avatar alt="2909nguyenv" src="" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
