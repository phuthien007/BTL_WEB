/* eslint-disable no-unused-vars */
import { Button, Form, Input, Modal, Switch } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
}
//   const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
//   };
const GroupForm = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div>
      <button type="button" onClick={showModal} className="btn btn-outline-primary mb-1">
        {type === 'add' ? 'Create group' : 'Edit'}
      </button>

      <Modal visible={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
        <div>
          <h3>Create a new group</h3>
          <hr />
          <Form {...layout} form={form} name="create group">
            <Form.Item name="name" label="Name">
              <Input placeholder="Name" type="text" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea placeholder="Description" type="text" />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Switch checkedChildren="Public" unCheckedChildren="Private" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default GroupForm
