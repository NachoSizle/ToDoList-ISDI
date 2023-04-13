
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/solid'
import { Button, Checkbox, Container, Col, Row, Spacer, Table, Text } from '@nextui-org/react'
import AwesomeModal, { ModalConfig } from '../AwesomeModal/AwesomeModal'
import { useAppSelector } from '../../hooks/useStore'
import { useToDoActions } from '../../hooks/useToDoActions'

const ADD_NEW_TODO_MODAL_CONFIG: ModalConfig = {
  title: 'Add new ToDo',
  openerButton: {
    isShadow: true,
    icon: <PlusCircleIcon />,
    text: "Add new ToDo!"
  },
  successButton: {
    text: "Create!",
  }
}

const UPDATE_TODO_MODAL_CONFIG: ModalConfig = {
  title: 'Update ToDo Title',
  openerButton: {
    icon: <PencilIcon />,
  },
  successButton: {
    text: "Update title!",
  }
}

export default function ToDoList() {
  const toDos = useAppSelector(state => state.toDos)
  const { createToDo, deleteById, updateStatus, updateTitle } = useToDoActions()

  if (!toDos.length) {
    return (
      <Container>
        <Row fluid justify="center" align="center" dir='column' css={{ textAlign: 'center' }}>
          <Text b color="inherit" hideIn="xs">
            You do not have tasks ;(
          </Text>
          <Spacer y={2} />
          <AwesomeModal modalConfig={ADD_NEW_TODO_MODAL_CONFIG}
            handleSuccess={($toDoTitle) => createToDo($toDoTitle)} />
        </Row>
      </Container>
    )
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
          {toDos.map((toDo) => (
            <Table.Row key={toDo._id}>
              <Table.Cell>{toDo._id}</Table.Cell>
              <Table.Cell>{toDo.title}</Table.Cell>
              <Table.Cell css={{ textAlign: "center", pl: 0 }}>
                <Checkbox aria-label='ToDo Status'
                  size='md'
                  isSelected={toDo.completed}
                  onChange={() => updateStatus(toDo._id, !toDo.completed)}></Checkbox>
              </Table.Cell>
              <Table.Cell css={{ pl: "0.5rem" }}>
                <Row justify="center" align="center">
                  <AwesomeModal modalConfig={UPDATE_TODO_MODAL_CONFIG}
                    titlePlaceholder={toDo.title}
                    handleSuccess={($toDoTitle) => updateTitle(toDo._id, $toDoTitle)} />
                  <Spacer y={1} />
                  <Button auto icon={<TrashIcon />} color="error" onPress={() => deleteById(toDo._id)}></Button>
                </Row>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Spacer y={1} />
      <AwesomeModal modalConfig={ADD_NEW_TODO_MODAL_CONFIG}
        handleSuccess={($toDoTitle) => createToDo($toDoTitle)} />
    </Container>
  );
}