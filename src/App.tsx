import { Card, Container, Spacer } from '@nextui-org/react';
import { NextUIProvider } from '@nextui-org/react';

import ToDoList from './components/ToDoList/ToDoList'
import NavBar from './components/NavBar/NavBar'


function App() {
  const handleToDoCompleted = (todoId: string) => {
    // MARK TODO COMPLETED
    console.log('ToDo --->> Completed', todoId)
  }

  return (
    <div className="App">
      <NextUIProvider>
        <NavBar />
        <Spacer y={4}/>
        <Container fluid>
          <Card >
            <Card.Body>
              <ToDoList markToDoAsCompleted={ handleToDoCompleted }/>
            </Card.Body>
          </Card>
        </Container>
      </NextUIProvider>
    </div>
  )
}

export default App
