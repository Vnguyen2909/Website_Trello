import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
import { useEffect, useState } from "react";
import { mapOrder } from "~/utils/sorts";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardDifferentColumnAPI,
} from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";

function Board() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "6a0b11eff0cc8bf25977772e";
    fetchBoardDetailsAPI(boardId).then((board) => {
      //Sap xep thu tu cac Column truoc khi dua du lieu xuong ben duoi cac component con
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");
      //Can xu ly van de keo tha vao mot column rong
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          //Sap xep thu tu cac Card truoc khi dua du lieu xuong ben duoi cac component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  //Goi API tao moi column va lam lai su lieu State Board
  const createNewColumn = async (newColumnData) => {
    const createColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    //Khi tao mot Column thi no se chua co card, xu ly van de keo tha gan PlaceholderCard vao
    createColumn.cards = [generatePlaceholderCard(createColumn)];
    createColumn.cardOrderIds = [generatePlaceholderCard(createColumn)._id];

    //Cap nhat State board
    const newBoard = { ...board };
    newBoard.columns.push(createColumn);
    newBoard.columnOrderIds.push(createColumn._id);
    setBoard(newBoard);
  };

  //Goi API tao moi card va lam lai su lieu State Board
  const createNewCard = async (newCardData) => {
    const createCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    //Cap nhat State
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createCard.columnId,
    );
    if (columnToUpdate) {
      //Neu column rong: ban chat la dang chua mot cai Placeholder card
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createCard];
        columnToUpdate.cards = [createCard._id];
      } else {
        //Nguoc lai push vao cuoi mang
        columnToUpdate.cards.push(createCard);
        columnToUpdate.cardOrderIds.push(createCard._id);
      }
    }
    setBoard(newBoard);
  };

  //Goi API khi keo tha Column xong
  const moveColumn = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    //Goi API Update Board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  //Di chuyen Card trong cung 1 Column
  const moveCardInTheSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId,
  ) => {
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId,
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    setBoard(newBoard);

    //Goi API update Column
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds,
    });
  };

  //Khi di chuyen Card sang Column khac
  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns,
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    //Goi API xu ly
    let prevCardOrderIds = dndOrderedColumns.find(
      (column) => column._id === prevColumnId,
    )?.cardOrderIds;

    //Xu ly van de khi keo Card cuoi cung trong Column, Column rong se co placholdercard, can xoa no di truoc khi gui du lieu ve phia BE
    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }

    moveCardDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(
        (column) => column._id === nextColumnId,
      )?.cardOrderIds,
    });
  };

  if (!board) {
    return (
      <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
        <CircularProgress size="40px" aria-label="Loading…" />
      </Stack>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  );
}

export default Board;
