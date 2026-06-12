import { createSlice } from '@reduxjs/toolkit'

//Khoi tao gia tri cua mot Slice trong redux
const initialState = {
  currentActiveCard: null,
  iShowModalActiveCard: false
}

//Khoi tao mot Slice trong kho luu tru - Redux Store
export const activeCardSilce = createSlice({
    name: 'activeCard',
    initialState,
    //Reducers: Noi xu ly du lieu dong bo
    reducers: {
        showModalActiveCard: (state) => {
            state.iShowModalActiveCard = true
        },

        clearAndHideCurrentActiveCard: (state) => {
            state.currentActiveCard = null,
            state.iShowModalActiveCard = false
        },

        updateCurrentActiveCard: (state, aciton) => {
            const fullCard = aciton.payload

            //Update lai du lieu cua cai currentActiveBoard
            state.currentActiveCard = fullCard
        }
    },

    extraReducers: (builder) => {}
})

// Actions: noi danh cho cac Components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer (chay dong bo)
export const { updateCurrentActiveCard, clearAndHideCurrentActiveCard, showModalActiveCard } = activeCardSilce.actions

//Selectors: noi danh cho cac Component ben duoi goi bang hook useSelector() de lay du lieu tu trong kho Redux Store ra su dung
export const selectCurrentActiveCard = (state) => {
    return state.activeCard.currentActiveCard
}

export const selectIshowModalActiveCard = (state) => {
    return state.activeCard.iShowModalActiveCard
}


// export default activeBoardSlice.reducer
export const activeCardReducer = activeCardSilce.reducer