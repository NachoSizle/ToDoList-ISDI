import { type Middleware, MiddlewareAPI, Dispatch, AnyAction } from "@reduxjs/toolkit"
import { useServerActions } from "../../hooks/useServerActions"
import { ToDoWithId, rollbackToDo } from "./slice"

const { createToDo, deleteById, updateStatus, updateTitle } = useServerActions()

const persistInfo = (action: any, prevState: ToDoWithId[], store: MiddlewareAPI<Dispatch<AnyAction>, any>) => {
  const { type, payload } = action

  try {
    switch(type) {
      case "toDos/createNewToDo":
        createToDo(payload)
        break;
      case "toDos/deleteToDoById":
        deleteById(payload)
        break;
      case "toDos/updateToDoStatus":
        updateStatus(payload._id, payload.completed)
        break;
      case "toDos/updateToDoTitle":
        updateTitle(payload._id, payload.title)
        break;
    }
  } catch(err) {
    const searchId = typeof payload === 'string' ? payload : payload._id
    const prevToDo = prevState.find(toDo => toDo._id === searchId)
    if (prevToDo) store.dispatch(rollbackToDo(prevToDo))
  }
}

export const persistMdw: Middleware = (store) => (next) => (action) => {
  const prevState: ToDoWithId[] = store.getState()

  next(action)

  persistInfo(action, prevState, store)
}