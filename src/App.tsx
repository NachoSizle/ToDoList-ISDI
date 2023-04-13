import { Card, Container, Spacer } from '@nextui-org/react';
import { NextUIProvider } from '@nextui-org/react';

import ToDoList from './components/ToDoList/ToDoList'
import NavBar from './components/NavBar/NavBar'
import { useToDoActions } from './hooks/useToDoActions'

function App() {
  const { fetchAllToDos } = useToDoActions();
  fetchAllToDos();

  return (
    <div className="App">
      <NextUIProvider>
        <NavBar />
        <Spacer y={4}/>
        <Container fluid>
          <Card >
            <Card.Body>
              <ToDoList/>
            </Card.Body>
          </Card>
        </Container>
      </NextUIProvider>
    </div>
  )
}

export default App
