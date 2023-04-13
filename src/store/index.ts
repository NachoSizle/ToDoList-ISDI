import { applyMiddleware, configureStore } from "@reduxjs/toolkit"
import toDosReducer from './todos/slice'
import thunkMiddleware from 'redux-thunk'
import { persistMdw } from "./todos/middleware";
import { composeWithDevTools } from "@redux-devtools/extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = configureStore({
  reducer: {
    toDos: toDosReducer
  },
  middleware: [
    persistMdw
  ],
  enhancers: [
    composedEnhancer
  ]
})

export type RootState = ReturnType<typeof store.getState>
