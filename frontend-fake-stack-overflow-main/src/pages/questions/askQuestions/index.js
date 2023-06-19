/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { Editor } from 'react-draft-wysiwyg'
import { InboxOutlined } from '@ant-design/icons'
import { Input, Select, Upload, Form, notification } from 'antd'
import draftToHtml from 'draftjs-to-html'
import api from 'services/api'
import { EditorState, convertFromRaw } from 'draft-js'
import { convertToHTML } from 'draft-convert'
import QuestionApi from 'services/api/question'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const { Dragger } = Upload
const { Option } = Select

const mapStateToProps = ({ user }) => ({ user })

const AskQuestion = ({ user }) => {
  const [form] = Form.useForm()
  const [refEditor, setRefEditor] = React.useState(null)
  const [tagsOption, setTagsOption] = React.useState([])
  const handleFinish = value => {
    if (value.tags) {
      const tags = value.tags.map(item => {
        if (item.startsWith('[') && item.endsWith(']')) {
          const arr = item.split('][')
          return {
            name: arr[0].replace('[', ''),
            description: arr[1].substring(0, arr[1].length - 1),
          }
        }
        return {
          _id: item,
        }
      })
      value.tags = tags
      // console.log(value.tags)
    }
    // call api create
    QuestionApi.createQuestion({
      ...value,
      content: convertToHTML(refEditor.getCurrentContent()),
      creator_id: user._id,
    })
      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          notification.success({
            message: 'Success',
            description: 'Create question success !',
          })
          form.resetFields()
        } else {
          notification.error({
            message: 'Error',
            description: 'Create question error !',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getDataTags = () => {
    api.TagApi.getAllTag({ sort: 'name,asc' }).then(res => {
      const data = res.data.tags.map(item => {
        return {
          label: item.name,
          value: item._id,
        }
      })
      setTagsOption(data)
    })
  }
  React.useEffect(() => {
    getDataTags()
  }, [])

  return (
    <div>
      <Helmet title="Wordpress Add" />
      <div className="card">
        <div className="card-body">
          <Form layout="vertical" form={form} onFinish={handleFinish}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Question title" />
                  </Form.Item>
                </div>
              </div>
            </div>
            {/* <div className="form-group">
              <Form.Item name="type" label="Type">
                <Checkbox.Group>
                  <div className="d-flex flex-wrap">
                    <div className="mr-3 mt-1 mb-1">
                      <Checkbox value="text">Text</Checkbox>
                    </div>
                    <div className="mr-3 mt-1 mb-1">
                      <Checkbox value="video">Video</Checkbox>
                    </div>
                    <div className="mr-3 mt-1 mb-1">
                      <Checkbox value="image">Image</Checkbox>
                    </div>
                    <div className="mr-3 mt-1 mb-1">
                      <Checkbox value="audio">Audio</Checkbox>
                    </div>
                    <div className="mr-3 mt-1 mb-1">
                      <Checkbox value="vimeo">Vimeo</Checkbox>
                    </div>
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </div> */}
            <div className="form-group">
              <Form.Item
                name="tags"
                label="Tag"
                help="Note: new tag = [name][description]. ex: [react][a framework for building user interfaces]"
              >
                <Select
                  mode="tags"
                  size="default"
                  filterOption={(input, option) => {
                    console.log(option)
                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }}
                  placeholder="Select question tag"
                  style={{ width: '100%' }}
                >
                  {tagsOption.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Description overview about your question" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item
                name="content"
                label="Content"
                // valuePropName="editorState"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Editor
                  // editorRef={
                  //   e => {
                  //     if (e?.props?.editorState instanceof EditorState) {
                  //       setRefEditor(e?.props?.editorState)
                  //       // console.log('a', convertToHTML(e?.props?.editorState?.getCurrentContent()))
                  //     }
                  //   }
                  //   // console.log('d', convertToHTML(e?.props?.editorState?.getCurrentContent()))
                  // }
                  onEditorStateChange={editorState => setRefEditor(editorState)}
                  // onContentStateChange={(value, e) => console.log(value, e)}
                  // onContentStateChange={editorState => console.log( convertT editorState)}
                  editorClassName="px-3 border border-gray-1"
                  editorStyle={{
                    minHeight: 250,
                    overflowY: 'scroll',
                  }}
                />
              </Form.Item>
            </div>
            {/* <div className="form-group">
              <Form.Item valuePropName="fileList" name="files">
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company
                    data or other band files
                  </p>
                </Dragger>
              </Form.Item>
            </div> */}
            <Form.Item>
              <button type="submit" className="btn btn-success btn-with-addon text-nowrap">
                <span className="btn-addon">
                  <i className="btn-addon-icon fe fe-plus-circle" />
                </span>
                Ask Question
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(AskQuestion))
