const BACK_URL = "http://localhost:3000/"

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const makeRequest = async (method: METHODS, endpoint?: string, body?: string) => {
  const data = await fetch(`${BACK_URL}${endpoint || ''}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body
  })
  return await data.json()
}

export const useServerActions = () => {

  const fetchAll = async () => {
    return await makeRequest(METHODS.GET) || []
  }

  const createToDo = async (title: string) => {
    return await makeRequest(METHODS.POST, '', JSON.stringify({ title }))
  }

  const deleteById = async (_id: string) => {
    return await makeRequest(METHODS.DELETE, _id)
  }

  const updateStatus = async (_id: string, completed: boolean) => {
    return await makeRequest(METHODS.PUT, _id, JSON.stringify({ completed }))
  }

  const updateTitle = async (_id: string, title: string) => {
    return await makeRequest(METHODS.PUT, _id, JSON.stringify({ title }))
  }

  return {
    fetchAll,
    createToDo,
    deleteById,
    updateStatus,
    updateTitle,
  }
}