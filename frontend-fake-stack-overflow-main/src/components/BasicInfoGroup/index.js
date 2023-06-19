/* eslint-disable default-case */
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Form, Input, Row, Tooltip } from 'antd'
import React, { useEffect } from 'react'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const BasicInfoGroup = ({ data }) => {
  const [form] = Form.useForm()

  const onFinish = values => {
    console.log(values)
  }

  useEffect(() => {
    form.setFieldsValue({
      ...data,
      blogs: data.blogs.length,
      questions: data.questions.length,
      members: data.members.length,
    })
  }, [])

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <h3>Basic information</h3>
      <hr />
      <Form.Item
        name="status"
        label="Status"
        // rules={[
        //   {
        //     required: true,
        //   },
        // ]}
      >
        <Input type="text" bordered={false} readOnly />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea bordered={null} readOnly />
      </Form.Item>
      <Form.Item name="created_at" label="Created at">
        <Input type="text" bordered={false} readOnly />
      </Form.Item>

      <Form.Item name="updated_at" label="Updated at">
        <Input type="text" bordered={false} readOnly />
      </Form.Item>
      <hr />
      <h3>Statistics</h3>
      <hr />
      <Row>
        {/* <Col span={12}>
          <Form.Item name="blogs" label="Blogs">
            <Input type="number" bordered={false} readOnly />
          </Form.Item>
        </Col> */}
        {/* <Col span={12}> */}
        <Form.Item name="questions" label="Questions">
          <Input type="number" bordered={false} readOnly />
        </Form.Item>
        {/* </Col> */}
      </Row>

      <Row>
        <Form.Item name="members" label="Members">
          <Input type="number" bordered={false} readOnly />
        </Form.Item>
        <Avatar.Group maxCount={4}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar
            style={{
              backgroundColor: '#f56a00',
            }}
          >
            K
          </Avatar>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar
            style={{
              backgroundColor: '#f56a00',
            }}
          >
            K
          </Avatar>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar
            style={{
              backgroundColor: '#f56a00',
            }}
          >
            K
          </Avatar>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Avatar
            style={{
              backgroundColor: '#f56a00',
            }}
          >
            K
          </Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{
                backgroundColor: '#87d068',
              }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{
              backgroundColor: '#1890ff',
            }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
      </Row>
    </Form>
  )
}
export default BasicInfoGroup
