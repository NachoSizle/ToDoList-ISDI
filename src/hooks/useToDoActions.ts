import { createNewToDo, deleteToDoById, updateToDoStatus, updateToDoTitle, getAllToDos } from "../store/todos/slice"
import { useAppDispatch } from "./useStore"

export const useToDoActions = () => {
  const dispatch = useAppDispatch()

  const fetchAllToDos = () => {
    dispatch(getAllToDos())
  }

  const createToDo = (title: string) => {
    dispatch(createNewToDo(title))
  }

  const deleteById = (_id: string) => {
    dispatch(deleteToDoById(_id))
  }

  const updateStatus = (_id: string, completed: boolean) => {
    dispatch(updateToDoStatus({ _id, completed }))
  }

  const updateTitle = (_id: string, title: string) => {
    dispatch(updateToDoTitle({ _id, title }))
  }

  return {
    fetchAllToDos,
    createToDo,
    deleteById,
    updateStatus,
    updateTitle,
  }
}