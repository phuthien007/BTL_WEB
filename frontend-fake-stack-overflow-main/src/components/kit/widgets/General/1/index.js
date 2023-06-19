import { Modal } from 'antd'
import BasicInfoGroup from 'components/BasicInfoGroup'
import React from 'react'
import moment from 'moment'
import { DATE_FORMAT } from 'services/utils'

const General1 = ({ action, data }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
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
      <p className="text-dark font-size-48 font-weight-bold mb-2">Name: {data.name}</p>
      <p className="text-dark font-size-32">Number: {data.members.length}</p>
      <p className="text-uppercase text-muted mb-3">
        Created at: {moment(data.created_at).format(DATE_FORMAT)}
      </p>
      <p className="mb-4">
        {data.description.length > 100
          ? `${data.description.substring(0, 100)}...`
          : data.description}
      </p>
      <a className="btn btn-outline-primary mb-1">{action.type}</a>
      <button type="button" onClick={showModal} className="btn btn-outline-primary mb-1">
        View group
      </button>
      <Modal
        footer={null}
        title={data.name}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <BasicInfoGroup data={data} />
      </Modal>
    </div>
  )
}

export default General1
