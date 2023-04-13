import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useServerActions } from "../../hooks/useServerActions";

export interface ToDo {
  title: string;
  completed: boolean;
}

export interface ToDoWithId extends ToDo {
  _id: string;
}

interface ToDoUpdateTitle {
  _id: string;
  title: string;
}

interface ToDoUpdateStatus {
  _id: string;
  completed: boolean;
}

const initialState: ToDoWithId[] = [];

export const getAllToDos = createAsyncThunk('toDos/fetchAll', async () => {
  const { fetchAll } = useServerActions();
  return [...await fetchAll()]
})

export const toDosSlice = createSlice({
  name: 'toDos',
  initialState,
  reducers: {
    createNewToDo: (state, action: PayloadAction<string>) => {
      const title = action.payload
      const toDo: ToDoWithId = {
        _id: crypto.randomUUID(),
        title,
        completed: false
      }
      return [...state, toDo]
    },
    updateToDoTitle: (state, action: PayloadAction<ToDoUpdateTitle>) => {
      const { title, _id } = action.payload
      const toDoToUpdate = state.find(toDo => toDo._id === _id)

      if (toDoToUpdate) {
        toDoToUpdate.title = title
      }
    },
    updateToDoStatus: (state, action: PayloadAction<ToDoUpdateStatus>) => {
      const { _id, completed } = action.payload
      const toDoToUpdate = state.find(toDo => toDo._id === _id)
     
      if (toDoToUpdate) {
        toDoToUpdate.completed = completed
      }
    },
    deleteToDoById: (state, action: PayloadAction<string>) => {
      const toDoId = action.payload;
      return state.filter(toDo => toDo._id !== toDoId)
    },
    rollbackToDo: (state, action: PayloadAction<ToDoWithId>) => {
      const toDoBack = action.payload
      const toDoFounded = state.find(toDo => toDo._id === toDoBack._id)

      if (!toDoFounded) {
        return [...state, toDoBack]
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllToDos.pending, () => { return [] }),
    builder.addCase(getAllToDos.fulfilled, (state, action) => { return action.payload }),
    builder.addCase(getAllToDos.rejected, () => { return [] })
  }
})

export default toDosSlice.reducer

export const {
  createNewToDo,
  deleteToDoById,
  updateToDoTitle,
  updateToDoStatus,
  rollbackToDo
} = toDosSlice.actions