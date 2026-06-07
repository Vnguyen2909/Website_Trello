import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios';
import { toast } from "react-toastify";

//Khoi tao gia tri cua mot Slice trong redux
const initialState = {
  currentUser: null
}

//Cac hanh dong goi API (bat dong bo) va cap nhat du lieu vao Redux, dung Midleware createAsyncThunk di kem voi extraReducers
export const loginUserAPI = createAsyncThunk(
    'user/loginUserAPI',
    async (data) => {
        const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
        return response.data
    }
)

export const updateUserAPI = createAsyncThunk(
    'user/updateUserAPI',
    async (data) => {
        const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
        return response.data
    }
)

export const logoutUserAPI = createAsyncThunk(
    'user/logoutUserAPI',
    async (showSuccessMessage = true) => {
        const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
        if(showSuccessMessage) {
          toast.success('Logged out successfully!')
        }
        return response.data
    }
)

//Khoi tao mot Slice trong kho luu tru - Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  //Reducers: Noi xu ly du lieu dong bo
  reducers: {
  },
  //ExtraReducers: Noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
        //action.payload chinh la response.data tra ve o tren
        let user = action.payload

        //Update lai du lieu cua cai currentUser
        state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {

      //Clear thong tin currentUser ve null
      state.currentUser = null
    })

    builder.addCase(updateUserAPI.fulfilled, (state, action) => {

      //action.payload chinh la response.data tra ve o tren
        let user = action.payload

        //Update lai du lieu cua cai currentUser
        state.currentUser = user
    })
  }
})

// Actions: noi danh cho cac Components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer (chay dong bo)
// export const { } = userSlice.actions

//Selectors: noi danh cho cac Component ben duoi goi bang hook useSelector() de lay du lieu tu trong kho Redux Store ra su dung
export const selectCurrentUser = (state) => {
    return state.user.currentUser
}

export const userReducer = userSlice.reducer