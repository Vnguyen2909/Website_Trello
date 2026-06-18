import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";

import ToggleFocusInput from "~/components/Form/ToggleFocusInput";
import VisuallyHiddenInput from "~/components/Form/VisuallyHiddenInput";
import { singleFileValidator } from "~/utils/validators";
import { toast } from "react-toastify";
import CardUserGroup from "./CardUserGroup";
import CardDescriptionMdEditor from "./CardDescriptionMdEditor";
import CardActivitySection from "./CardActivitySection";

import {
  updateCurrentActiveCard,
  selectCurrentActiveCard,
  clearAndHideCurrentActiveCard,
  selectIshowModalActiveCard,
} from "~/redux/activeCard/activeCardSlice";
import { useDispatch, useSelector } from "react-redux";

import { updateCardDetailsAPI } from "~/apis";
import { updateCardInBoard } from "~/redux/activeBoard/activeBoardSlice";
import { selectCurrentUser } from "~/redux/user/userSlice";
import { CARD_MEMBER_ACTIONS } from "~/utils/constants";

import { styled } from "@mui/material/styles";
const SidebarItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  color: theme.palette.mode === "dark" ? "#90caf9" : "#172b4d",
  backgroundColor: theme.palette.mode === "dark" ? "#2f3542" : "#091e420f",
  padding: "10px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#33485D" : theme.palette.grey[300],
    "&.active": {
      color: theme.palette.mode === "dark" ? "#000000de" : "#0c66e4",
      backgroundColor: theme.palette.mode === "dark" ? "#90caf9" : "#e9f2ff",
    },
  },
}));

/**Modal: mot low-component cua MUI su dung ben trong cac Dialog, Drawer, Menu, Popover*/

function ActiveCard() {
  const dispatch = useDispatch();
  const activeCard = useSelector(selectCurrentActiveCard);
  const iShowactiveCard = useSelector(selectIshowModalActiveCard);
  const currentUser = useSelector(selectCurrentUser);

  const handleCloseModal = () => {
    dispatch(clearAndHideCurrentActiveCard());
  };

  //function goi API dung chung cho cac truong hop updateCard title, description, comment,...
  const callApiUpdateCard = async (updateData) => {
    const updatedCard = await updateCardDetailsAPI(activeCard._id, updateData);
    //Cap nhat lai cai card trong active
    dispatch(updateCurrentActiveCard(updatedCard));
    //Cap nhat lai ban ghi card trong cai activeBoard
    dispatch(updateCardInBoard(updatedCard));
    return updatedCard;
  };

  const onUpdateCardTitle = (newTitle) => {
    // Call API...
    callApiUpdateCard({ title: newTitle.trim() });
  };

  const onUpdateCardDescription = (newDescription) => {
    // Call API...
    callApiUpdateCard({ description: newDescription });
  };

  const onUploadCardCover = (event) => {
    const error = singleFileValidator(event.target?.files[0]);
    if (error) {
      toast.error(error);
      return;
    }
    let reqData = new FormData();
    reqData.append("cardCover", event.target?.files[0]);

    // Call API...
    toast.promise(
      callApiUpdateCard(reqData).finally(() => (event.target.value = "")),
      { pending: "Updating..." },
    );
  };

  //Dung async await o day de component con CardActivitySection cho va neu thanh cong thi moi clear the input comment
  const onAddCardComments = async (commentToAdd) => {
    //Call API updateCard
    await callApiUpdateCard({ commentToAdd });
  };

  const onUpdateCardMembers = (incomingMemberInfo) => {
    //Call API updateCard
    callApiUpdateCard({ incomingMemberInfo });
  };

  return (
    <Modal
      disableScrollLock
      open={iShowactiveCard}
      onClose={handleCloseModal}
      sx={{
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: {
            xs: "95%",
            sm: "90%",
            md: 900,
          },
          maxWidth: "900px",
          my: 4,
          mx: "auto",
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: "8px",
          border: "none",
          outline: 0,
          p: {
            xs: 2,
            sm: 3,
            md: "40px 20px 20px",
          },
          mt: {
            xs: 2,
            sm: 4,
            md: 6,
          },
          mb: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "12px",
            right: "10px",
            cursor: "pointer",
          }}
        >
          <CancelIcon
            color="error"
            sx={{ "&:hover": { color: "error.light" } }}
            onClick={handleCloseModal}
          />
        </Box>
        {activeCard?.cover && (
          <Box sx={{ mb: 4 }}>
            <img
              style={{
                width: "100%",
                height: "320px",
                borderRadius: "6px",
                objectFit: "cover",
              }}
              src={activeCard?.cover}
              alt="card-cover"
            />
          </Box>
        )}

        <Box
          sx={{
            mb: 1,
            mt: -3,
            pr: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CreditCardIcon />

          {/* Xu ly title Card */}
          <ToggleFocusInput
            inputFontSize="22px"
            value={activeCard?.title}
            onChangedValue={onUpdateCardTitle}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Left side */}
          <Grid xs={12} sm={9}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontWeight: "600", color: "primary.main", mb: 1 }}
              >
                Members
              </Typography>

              {/*Xu ly cac members cua Card */}
              <CardUserGroup
                cardMemberIds={activeCard?.memberIds}
                onUpdateCardMembers={onUpdateCardMembers}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography
                  variant="span"
                  sx={{ fontWeight: "600", fontSize: "20px" }}
                >
                  Description
                </Typography>
              </Box>

              {/*Xu ly mo ta Card*/}
              <CardDescriptionMdEditor
                cardDescriptionProp={activeCard?.description}
                handleUpdateDescription={onUpdateCardDescription}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <DvrOutlinedIcon />
                <Typography
                  variant="span"
                  sx={{ fontWeight: "600", fontSize: "20px" }}
                >
                  Activity
                </Typography>
              </Box>

              {/*Xu ly actitvity cacrd: comment vao card  */}
              <CardActivitySection
                cardComments={activeCard?.comments}
                onAddCardComments={onAddCardComments}
              />
            </Box>
          </Grid>

          {/* Right side */}
          <Grid xs={12} sm={3}>
            <Typography
              sx={{ fontWeight: "600", color: "primary.main", mb: 1 }}
            >
              Add To Card
            </Typography>
            <Stack direction="column" spacing={1}>
              {/*Xu ly hanh dong: user tu join vao card */}
              {/*Neu user hien tai dang dang nhap chua thuoc mang memberIds cua card thi moi cho hien Join */}
              {/*Khi click vao Join thuc hien luon hanh dong ADD */}
              {!activeCard?.memberIds?.includes(currentUser._id) && (
                <SidebarItem
                  className="active"
                  onClick={() =>
                    onAddCardComments({
                      userId: currentUser._id,
                      action: CARD_MEMBER_ACTIONS.ADD,
                    })
                  }
                >
                  <PersonOutlineOutlinedIcon fontSize="small" />
                  Join
                </SidebarItem>
              )}

              {/*Xu ly cap nhat anh Cover cua Card */}
              <SidebarItem className="active" component="label">
                <ImageOutlinedIcon fontSize="small" />
                Cover
                <VisuallyHiddenInput type="file" onChange={onUploadCardCover} />
              </SidebarItem>

              <SidebarItem>
                <AttachFileOutlinedIcon fontSize="small" />
                Attachment
              </SidebarItem>
              <SidebarItem>
                <LocalOfferOutlinedIcon fontSize="small" />
                Labels
              </SidebarItem>
              <SidebarItem>
                <TaskAltOutlinedIcon fontSize="small" />
                Checklist
              </SidebarItem>
              <SidebarItem>
                <WatchLaterOutlinedIcon fontSize="small" />
                Dates
              </SidebarItem>
              <SidebarItem>
                <AutoFixHighOutlinedIcon fontSize="small" />
                Custom Fields
              </SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontWeight: "600", color: "primary.main", mb: 1 }}
            >
              Power-Ups
            </Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem>
                <AspectRatioOutlinedIcon fontSize="small" />
                Card Size
              </SidebarItem>
              <SidebarItem>
                <AddToDriveOutlinedIcon fontSize="small" />
                Google Drive
              </SidebarItem>
              <SidebarItem>
                <AddOutlinedIcon fontSize="small" />
                Add Power-Ups
              </SidebarItem>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography
              sx={{ fontWeight: "600", color: "primary.main", mb: 1 }}
            >
              Actions
            </Typography>
            <Stack direction="column" spacing={1}>
              <SidebarItem>
                <ArrowForwardOutlinedIcon fontSize="small" />
                Move
              </SidebarItem>
              <SidebarItem>
                <ContentCopyOutlinedIcon fontSize="small" />
                Copy
              </SidebarItem>
              <SidebarItem>
                <AutoAwesomeOutlinedIcon fontSize="small" />
                Make Template
              </SidebarItem>
              <SidebarItem>
                <ArchiveOutlinedIcon fontSize="small" />
                Archive
              </SidebarItem>
              <SidebarItem>
                <ShareOutlinedIcon fontSize="small" />
                Share
              </SidebarItem>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ActiveCard;
