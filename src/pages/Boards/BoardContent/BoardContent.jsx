import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColums";
import { mapOrder } from "~/utils/sorts";
import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });

  //Yeu cau chuot di chuyen 10px thi moi kich hoat event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  //Nhan giu 250ms va dung sai cua cam ung
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });

  const mySensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      //Lay vi tri cu (tu thang active)
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      //Lay vi tri thay doi (tu thang over)
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);
      //Thay doi bang arrayMove
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      /*const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      console.log("dndOrderedColumns:", dndOrderedColumns);
      console.log("dndOrderedColumnsIds:", dndOrderedColumnsIds);*/

      setOrderedColumns(dndOrderedColumns);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#30495e" : "#1976b2",
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  );
}

export default BoardContent;
