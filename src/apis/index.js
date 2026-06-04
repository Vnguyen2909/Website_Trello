import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios';

//Update data board
export const updateBoardDetailsAPI = async (boardId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    
    return response.data
}

//MoveCardDifferentColumn
export const moveCardDifferentColumnAPI = async (updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
    
    return response.data
}

//Columns
//Create Column
export const createNewColumnAPI = async (newColumnData) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns/`, newColumnData)
    return response.data
}

//Update data column 
export const updateColumnDetailsAPI = async (columnId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    
    return response.data
}

//Delete column 
export const deleteColumnDetailsAPI = async (columnId) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
    
    return response.data
}


//Cards
export const createNewCardAPI = async (newCardData) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards/`, newCardData)
    return response.data
}