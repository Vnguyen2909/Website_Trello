import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Tooltip from "@mui/material/Tooltip";
import { formatcapitalizeFirstLetterter } from "~/utils/formatters";
import BoardUserGroup from "./BoardUserGroup";
import InviteBoardUser from "./InviteBoardUser";

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
        <Tooltip title={board?.description}>
          <Chip
            sx={Menu_Style}
            icon={<DashboardIcon />}
            label={board?.title}
            onClick={() => {}}
          />
        </Tooltip>

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
        {/**Xu ly moi user vao lam thanh vien cua Board */}
        <InviteBoardUser boardId={board?._id} />
        <BoardUserGroup boardUsers={board?.FE_AllUsers} />
      </Box>
    </Box>
  );
}

export default BoardBar;
