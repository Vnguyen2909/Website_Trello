import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from "~/utils/sorts";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";
import authorizeAxiosInstance from '~/utils/authorizeAxios';

//Khoi tao gia tri cua mot Slice trong redux
const initialState = {
  currentActiveBoard: null
}

//Cac hanh dong goi API (bat dong bo) va cap nhat du lieu vao Redux, dung Midleware createAsyncThunk di kem voi extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
        return response.data
    }
)

//Khoi tao mot Slice trong kho luu tru - Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  //Reducers: Noi xu ly du lieu dong bo
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const board = action.payload

      //Xu ly du lieu neu can thiet
      //...

      //Update lai du lieu cua cai currentActiveBoard
      state.currentActiveBoard = board
    }
  },
  //ExtraReducers: Noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
        //action.payload chinh la response.data tra ve o tren
        let board = action.payload

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
        //Update lai du lieu cua cai currentActiveBoard
        state.currentActiveBoard = board
    })
  }
})

// Actions: noi danh cho cac Components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer (chay dong bo)
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

//Selectors: noi danh cho cac Component ben duoi goi bang hook useSelector() de lay du lieu tu trong kho Redux Store ra su dung
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}

// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer