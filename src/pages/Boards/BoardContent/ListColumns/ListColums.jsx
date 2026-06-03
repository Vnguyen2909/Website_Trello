import Box from "@mui/material/Box";
import Column from "./Columns/Column";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { createNewColumnAPI } from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { cloneDeep } from "lodash";
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { useDispatch, useSelector } from "react-redux";

function ListColumns({ columns }) {
  const disPatch = useDispatch();
  const board = useSelector(selectCurrentActiveBoard);

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm((prev) => !prev);
  };

  const closeNewColumnForm = () => {
    setOpenNewColumnForm(false);
    setNewColumnTitle("");
  };

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error("Please enter card title!", {
        autoClose: 1200,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    //Tao du lieu Column de goi API
    const newColumnData = {
      title: newColumnTitle,
    };

    //Goi API tao moi column va lam lai su lieu State Board
    const createColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    //Khi tao mot Column thi no se chua co card, xu ly van de keo tha gan PlaceholderCard vao
    createColumn.cards = [generatePlaceholderCard(createColumn)];
    createColumn.cardOrderIds = [generatePlaceholderCard(createColumn)._id];

    //Cap nhat State board
    const newBoard = cloneDeep(board);
    newBoard.columns.push(createColumn);
    newBoard.columnOrderIds.push(createColumn._id);

    disPatch(updateCurrentActiveBoard(newBoard));
    // Reset form
    closeNewColumnForm();
  };

  return (
    <SortableContext
      items={columns?.map((column) => column._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": { m: 2 },
        }}
      >
        {/* Render Columns */}
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {/* Add New Column */}
        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toggleOpenNewColumnForm();
              }}
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
              startIcon={<NoteAddIcon />}
            >
              Add new Column
            </Button>
          </Box>
        ) : (
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              fullWidth
              onChange={(e) => setNewColumnTitle(e.target.value)}
              value={newColumnTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addNewColumn();
                }
              }}
              sx={{
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&.Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.success.main,
                  },
                }}
                onClick={addNewColumn}
              >
                Add Column
              </Button>

              <CloseIcon
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    color: (theme) => theme.palette.warning.light,
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  closeNewColumnForm();
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
