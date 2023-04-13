import { ReactNode, useState } from 'react'
import { Button, Input, Modal, Text } from "@nextui-org/react"
import { NormalColors } from '@nextui-org/react';

type AwesomeButton = {
  icon?: ReactNode,
  text?: string,
  color?: NormalColors,
  isShadow?: boolean,
}

export type ModalConfig = {
  title: string,
  openerButton?: AwesomeButton,
  cancelButton?: AwesomeButton,
  successButton?: AwesomeButton,
}

type AwesomeModalProps = {
  handleSuccess: (title: string) => void,
  titlePlaceholder?: string,
  modalConfig: ModalConfig,
}

export default function AwesomeModal(props: AwesomeModalProps) {
  const { handleSuccess, modalConfig, titlePlaceholder } = props;
  const { title, openerButton, cancelButton, successButton } = modalConfig;

  const [visible, setVisible] = useState(false);
  const [toDoTitle, setToDoTitle] = useState('');

  const closeHandler = () => {
    setVisible(false)
    if (toDoTitle !== '') {
      handleSuccess(toDoTitle)
      setToDoTitle('')
    }
  };

  return (
    <div>
      <Button auto
        shadow={openerButton?.isShadow || false}
        icon={openerButton?.icon}
        color={openerButton?.color || "success"}
        onPress={() => setVisible(true)}>
          { openerButton?.text }
      </Button>
      <Modal
        closeButton
        blur
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            { title }
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input rounded
            bordered
            status="primary"
            placeholder={titlePlaceholder || "Make awesome React Component"}
            aria-label='Title of new To Do'
            onChange={$event => setToDoTitle($event.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat
            icon={cancelButton?.icon}
            color={cancelButton?.color || "default"}
            onPress={closeHandler}>
              { cancelButton?.text || "Cancel" }
          </Button>
          <Button auto
            icon={successButton?.icon}
            color={successButton?.color || "default"}
            onPress={closeHandler}>
              { successButton?.text }
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}