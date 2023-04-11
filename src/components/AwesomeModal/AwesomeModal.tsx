import { useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { Button, Container, Input, Modal, Text } from "@nextui-org/react"

type AwesomeModalProps = {
  handleCreateNewToDo: (title: string) => void,
}

export default function AwesomeModal(props: AwesomeModalProps) {
  const { handleCreateNewToDo } = props;
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');

  const closeHandler = () => {
    setVisible(false)
    if (title !== '') {
      handleCreateNewToDo(title)
      setTitle('')
    }
  };

  return (
    <Container>
      <Button shadow icon={<PlusCircleIcon />} color="success" onPress={() => setVisible(true)}>Add new ToDo</Button>
      <Modal
        closeButton
        blur
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add new
            <Text b size={18}>
              ToDo!
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input rounded
            bordered
            status="primary"
            placeholder="Make awesome React Component"
            aria-label='Title of new To Do'
            value={title}
            onChange={$event => setTitle($event.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={closeHandler}>
            Add!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}