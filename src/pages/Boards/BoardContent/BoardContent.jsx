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
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { cloneDeep } from "lodash";
import Column from "./ListColumns/Columns/Column";
import Cards from "./ListColumns/Columns/ListCards/Card/Card";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAGITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAGITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);

  //Cung 1 thoi diem chi co mot phan tu duoc keo (Column hoac Card)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

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

  //Tim column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId),
    );
  };

  //Cap nhat lai State khi di chuyen card giua cac columns khac nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDragItemData,
  ) => {
    setOrderedColumns((prevColumns) => {
      //Tim vi tri (index) overCard trong Column dich den (noi ma activeCard sap duoc tha)
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId,
      );

      //Logic tinh toan 'cardIndex moi"
      let newCardIndex;
      //rect vi tri cua phan tu so voi khung hinh
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.lenght + 1;

      //nextColumns: Column moi
      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id,
      );

      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id,
      );

      //nextActiveColumn: Column cu
      if (nextActiveColumn) {
        //Xoa card o Column active (xoa card o column cu)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId,
        );

        //Cap nhat lai mang CardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id,
        );
      }

      if (nextOverColumn) {
        //Kiem tra xem card dang keo co ton tai o OverColumn chua, neu co thi xoa no truoc
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId,
        );

        //Phai cap nhat lai chuan du lieu ColumnId trong card sau khi keo card giua 2 column
        const rebuild_activeDraggingCardData = {
          ...activeDragItemData,
          columnId: nextOverColumn._id,
        };

        //Them card dang keo vao overColumn theo vi tri index moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData,
        );

        //Cap nhat lai mang CardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id,
        );
      }

      return nextColumns;
    });
  };

  //Trigger khi bat dau hanh dong keo(drag) mot phan tu
  const handleDragStart = (event) => {
    // console.log("handleDragStart:", event);
    setActiveDragItemId(event?.active?.id);

    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
    );
    setActiveDragItemData(event?.active?.data?.current);

    //Neu la drag card thi moi thuc hien hanh dong set gia tri oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  //Trigger qua trinh keo
  const handleDragOver = (event) => {
    //Khong lam gi them khi keo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    //Con neu keo card thi xu ly them qua lai giua cac Column

    const { active, over } = event;
    //Kiem tra neu khong ton tai active hoac over
    if (!active || !over) return;

    //activeDraggingCardData: la cai card dang duoc keo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    //overCard la card dang tuong tac o phia tren hoac phia duoi so voi cai card keo o tren
    const { id: overCardId } = over;

    //Tim 2 cai Column theo CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDragItemData,
      );
    }
  };

  //Trigger khi ket thuc hanh dong keo mot phan tu (hanh dong tha(drop))
  const handleDragEnd = (event) => {
    const { active, over } = event;
    //Kiem tra neu khong ton tai active hoac over
    if (!active || !over) return;

    //Xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //activeDraggingCardData: la cai card dang duoc keo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      //overCard la card dang tuong tac o phia tren hoac phia duoi so voi cai card keo o tren
      const { id: overCardId } = over;

      //Tim 2 cai Column theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //Hanh dong keo tha card voi 2 colum khac nhau
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDragItemData,
        );
      } else {
        //Hanh dong keo tha card trong cung mot column
        //Lay vi tri cu (tu thang oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId,
        );
        //Lay vi tri thay doi (tu thang over)
        const newCardIndex = overColumn?.cards.findIndex(
          (c) => c._id === overCardId,
        );

        //Thay doi bang arrayMove
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex,
        );

        setOrderedColumns((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);

          //Tim toi cai Column dang keo tha
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id,
          );

          //Cap nhat lai 2 gia tri moi la card va CardOrderIds trong TargerColumn
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id);

          //Tra ve vi tri state moi (chuan vi tri)
          return nextColumns;
        });
      }
    }

    //Xu ly keo tha columns trong mot cai BoardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //Lay vi tri cu (tu thang active)
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id,
        );
        //Lay vi tri thay doi (tu thang over)
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id,
        );
        //Thay doi bang arrayMove
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex,
        );
        //cloneDeepconst dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

        setOrderedColumns(dndOrderedColumns);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  //Animation khi tha
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: 0.5 } },
    }),
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={mySensors}
      //Thuat toan phat hien va cham su dung colsetsCorners(va cham goc)
      collisionDetection={closestCorners}
    >
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
        <DragOverlay dropAnimation={customDropAnimation}>
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN &&
            activeDragItemData && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD &&
            activeDragItemData && <Cards card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
