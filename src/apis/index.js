import axios from 'axios';
import { API_ROOT } from '~/utils/constants'

//Boards
export const fetchBoardDetailsAPI = async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    
    return response.data
}

//Update data board
export const updateBoardDetailsAPI = async (boardId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    
    return response.data
}

//MoveCardDifferentColumn
export const moveCardDifferentColumnAPI = async (updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
    
    return response.data
}

//Columns
//Create Column
export const createNewColumnAPI = async (newColumnData) => {
    const response = await axios.post(`${API_ROOT}/v1/columns/`, newColumnData)
    return response.data
}

//Update data column 
export const updateColumnDetailsAPI = async (columnId, updateData) => {
    const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    
    return response.data
}

//Delete column 
export const deleteColumnDetailsAPI = async (columnId) => {
    const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
    
    return response.data
}


//Cards
export const createNewCardAPI = async (newCardData) => {
    const response = await axios.post(`${API_ROOT}/v1/cards/`, newCardData)
    return response.data
}