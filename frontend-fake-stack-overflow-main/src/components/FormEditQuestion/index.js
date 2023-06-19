/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { Descriptions, Form, Input, PageHeader, Select, notification } from 'antd'
import { convertFromHTML, convertToHTML } from 'draft-convert'
import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { connect } from 'react-redux'
import htmlToDraft from 'html-to-draftjs'
import { ContentState, EditorState } from 'draft-js'
import { withRouter } from 'react-router-dom'
import api from 'services/api'
import QuestionApi from 'services/api/question'
import { history } from 'index'

const mapStateToProps = ({ user }) => ({ user })
const htmlToDraftBlocks = html => {
  const blocksFromHtml = htmlToDraft(html)
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
  const editorState = EditorState.createWithContent(contentState)
  return editorState
}

const FormEditQuestion = ({ id, user }) => {
  const [form] = Form.useForm()
  const [data, setData] = React.useState({
    title: '',
    content: '',
    tags: [],
  })
  const [refEditor, setRefEditor] = React.useState(htmlToDraftBlocks(data.content))
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
    QuestionApi.updateQuestion(data._id, {
      ...value,
      content: convertToHTML(refEditor.getCurrentContent()),
      creator_id: user._id,
    })
      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          notification.success({
            message: 'Success',
            description: 'Update question success !',
          })
          window.history.back()
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
  const getDataQuestion = () => {
    QuestionApi.getQuestionById(id)
      .then(res => {
        const { status, data } = res
        if (status && status === 'success') {
          setData(data.question)
        } else {
          notification.error({
            message: 'Error',
            description: 'Get question error !',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    getDataTags()
    getDataQuestion()
  }, [])

  React.useEffect(() => {
    form.setFieldsValue({
      ...data,
      tags: [...data.tags.map(item => item._id)],
      // content: convertToHTML(refEditor.getCurrentContent()),
    })
    setRefEditor(htmlToDraftBlocks(data.content))
  }, [data])

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={data.title}
        subTitle="Edit question"
      >
        <div className="card">
          <div className="card-body">
            <Descriptions size="small" column={3}>
              <Descriptions.Item>
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
                        placeholder="Select question tag"
                        style={{ width: '100%' }}
                        filterOption={(input, option) => {
                          return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }}
                      >
                        {tagsOption.map((item, index) => (
                          <Select.Option key={index} value={item.value}>
                            {item.label}
                          </Select.Option>
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
                        editorState={refEditor}
                        // defaultContentState={convertFromHTML(data.content)}
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
                      Update Question
                    </button>
                  </Form.Item>
                </Form>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </PageHeader>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(FormEditQuestion))
