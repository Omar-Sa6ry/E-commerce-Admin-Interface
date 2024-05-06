import React from 'react'
import { Modal } from 'antd'

const CustomModel = props => {
  const { open, hideModal, performAction, onClick, title } = props
  return (
    <Modal
      title='Confirmation'
      open={open}
      onClick={onClick}
      onOk={performAction}
      onCancel={hideModal}
      okText='Delete'
      cancelText='Cancel'
    >
      <p>{title}</p>
    </Modal>
  )
}

export default CustomModel
