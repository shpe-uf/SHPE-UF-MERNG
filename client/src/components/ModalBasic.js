import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalBasic = (props) => (
  <Modal open={props.open} basic size='small'>
    <Header icon='mail' content='Confirm Email' />
    <Modal.Content>
      <p>
        Please go to your UF email and click on the link to
        to confirm you email, thank you!
      </p>
    </Modal.Content>
    <Modal.Actions>
          <Button color='green' onClick={props.handleClose} inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
  </Modal>
)

export default ModalBasic
