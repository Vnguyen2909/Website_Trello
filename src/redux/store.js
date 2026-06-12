//Redux: State management tool
import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from '~/redux/activeBoard/activeBoardSlice'
import { activeCardReducer } from './activeCard/activeCardSlice'
import { userReducer } from './user/userSlice'

/**Cau hinh Redux persist*/
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' //default to localStorage
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

//Cau hinh persist
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] //dinh nghia cac slice du lieu duoc phep duy tri qua moi lan f5 trinh duyet
}

//Combine cac reducers
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer,
  activeCard: activeCardReducer
})

//Thuc hien persist Reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER
        ]
      }
    })
})