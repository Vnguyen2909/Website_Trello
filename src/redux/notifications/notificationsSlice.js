import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

//Khoi tao gia tri cua mot Slice trong redux
const initialState = {
  currentNotifications: null
}

//Cac hanh dong goi API (bat dong bo) va cap nhat du lieu vao Redux, dung Midleware createAsyncThunk di kem voi extraReducers
export const fetchInvitationsAPI = createAsyncThunk(
    'notifications/fetchInvitationsAPI',
    async () => {
        const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
        return response.data
    }
)

export const updateBoardInvitationsAPI = createAsyncThunk(
    'notifications/updateBoardInvitationsAPI',
    async ({ status, invitationId }) => {
        const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${ invitationId }`, { status })
         console.log("UPDATE RESPONSE:", response.data)
        return response.data
    }
)

//Khoi tao mot Slice trong kho luu tru - Redux Store
export const notificationsSilce = createSlice({
    name: 'notifications',
    initialState,
    //Reducers: Noi xu ly du lieu dong bo
    reducers: {
        clearCurrentNotifications: (state) => {
            state.currentNotifications = null
        },

        updateCurrentNotifications: (state, action) => {
            state.currentNotifications = action.payload
        },

        addNotification: (state, action) => {
            const incomingInvitation = action.payload

            //unshift them phan tu vao dau mang
            state.currentNotifications.unshift(incomingInvitation)
        },

    },

    extraReducers: (builder) => {
        builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
            let incomingInvitations = action.payload

            //Dao nguoc mang Invitations (De hien thi cai moi nhat)
            state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
        });

        builder.addCase(updateBoardInvitationsAPI.fulfilled, (state, action) => {
            let incomingInvitations = action.payload

            //Cap nhat lai du lieu boardInvitation (ben trong no se co ca Status moi sau khi update)
            // const getInvitation = state.currentNotifications.find(i => i._id === incomingInvitations._id)
            // getInvitation.boardInvitation = incomingInvitations.boardInvitation

            const index = state.currentNotifications?.findIndex(i => i._id === incomingInvitations._id)

            if(index !== -1){
                state.currentNotifications[index] = {
                    ...state.currentNotifications[index],
                    boardInvitation: incomingInvitations.boardInvitation
                }
            } 
        })
    }
})

// Actions: noi danh cho cac Components ben duoi goi bang dispatch() toi no de cap nhat lai du lieu thong qua reducer (chay dong bo)
export const { clearCurrentNotifications, updateCurrentNotifications, addNotification } = notificationsSilce.actions

//Selectors: noi danh cho cac Component ben duoi goi bang hook useSelector() de lay du lieu tu trong kho Redux Store ra su dung
export const selectCurrentNotifications = (state) => {
    return state.notifications.currentNotifications
}

// export default NotificationsReducer
export const notificationsReducer = notificationsSilce.reducer