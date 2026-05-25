import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "~/pages/Boards/BoardBar/BoardBar";
import BoardContent from "~/pages/Boards/BoardContent/BoardContent";
import { useEffect, useState } from "react";
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
} from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";

function Board() {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = "6a0b11eff0cc8bf25977772e";
    fetchBoardDetailsAPI(boardId).then((board) => {
      //Can xu ly van de keo tha vao mot column rong
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
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
      columnToUpdate.cards.push(createCard);
      columnToUpdate.cardOrderIds.push(createCard._id);
    }
    setBoard(newBoard);
  };

  //Goi API khi keo tha Column xong
  const moveColumn = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    //Goi API Update Board
    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumn={moveColumn}
      />
    </Container>
  );
}

export default Board;
