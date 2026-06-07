import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logoutUserAPI } from "~/redux/user/userSlice";
import { useConfirm } from "material-ui-confirm";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const confirmLogout = useConfirm();
  const handleLogout = () => {
    confirmLogout({
      title: "Log out of your account?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    })
      .then(() => {
        dispatch(logoutUserAPI());
      })
      .catch(() => {});
  };

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? "basic-menu-profiles" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 34, height: 34 }} src={currentUser?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ color: "white" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <Link
          to="/settings/account"
          style={{
            color: "inherit",
          }}
        >
          <MenuItem
            sx={{
              "&:hover": { color: "success.light" },
            }}
          >
            <Avatar sx={{ mr: 2 }} src={currentUser?.avatar} /> Profile
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          sx={{
            "&:hover": {
              color: "warning.dark",
              "& .logout-icon": { color: "warning.dark" },
            },
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout className="logout-icon" fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Profiles;
