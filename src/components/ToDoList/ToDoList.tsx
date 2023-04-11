import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import { Button, Checkbox, Container, Row, Spacer, Table } from '@nextui-org/react'
import AwesomeModal from '../AwesomeModal/AwesomeModal';

const toDos: {
  id: string,
  title: string;
  completed: boolean;
}[] = [
    {
      id: '0',
      title: "Make components",
      completed: false,
    },
    {
      id: '1',
      title: "Make backend in NodeJS",
      completed: false,
    },
    {
      id: '2',
      title: "Manage data in Redux Toolkit",
      completed: false,
    },
    {
      id: '3',
      title: "Persist data in MongoDB",
      completed: false,
    },
  ];

type ToDoListProps = {
  markToDoAsCompleted: (todoId: string) => void;
}

export default function ToDoList(props: ToDoListProps) {
  
  const createNewToDo = ($toDoTitle: String) => {
    console.log('Create new toDo --->>', $toDoTitle)
  }

  return (
    <Container>
      <Table
        aria-label="ToDo list"
        css={{
          height: "auto",
          minWidth: "100%",
        }}>
        <Table.Header>
          <Table.Column>ID</Table.Column>
          <Table.Column>Title</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Status</Table.Column>
          <Table.Column css={{ textAlign: "center" }}>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {toDos.map((todo) => (
            <Table.Row key={todo.id}>
              <Table.Cell>{todo.id}</Table.Cell>
              <Table.Cell>{todo.title}</Table.Cell>
              <Table.Cell css={{ textAlign: "center", pl:0 }}>
                <Checkbox aria-label='ToDo Status'
                  size='md'
                  isSelected={todo.completed}
                  onChange={() => props.markToDoAsCompleted(todo.id)}></Checkbox>
              </Table.Cell>
              <Table.Cell css={{ pl: "0.5rem" }}>
                <Row justify="center" align="center">
                  <Button icon={<PencilIcon />} auto></Button>
                  <Spacer y={1} />
                  <Button icon={<TrashIcon />} color="error" auto></Button>
                </Row>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Spacer y={1} />
      <AwesomeModal handleCreateNewToDo={createNewToDo} />
    </Container>
  );
}