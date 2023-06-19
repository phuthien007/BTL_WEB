/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { MailOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Button, Form, Input, Tabs, Tooltip, notification } from 'antd'
import General15 from 'components/kit/widgets/General/15'
import { Editor } from 'react-draft-wysiwyg'

import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { TabPane } from 'reactstrap'
import { Link, useLocation, useParams, withRouter } from 'react-router-dom'
import moment from 'moment'
import { convertToHTML } from 'draft-convert'
import QuestionApi from 'services/api/question'
import UserApi from 'services/api/user'
import { connect, useDispatch } from 'react-redux'
import { history } from 'index'

const mapStateToProps = ({ user }) => ({ user })

const DetailQuestion = ({ user }) => {
  const params = useParams()
  // console.log('a', params.id)
  // const { data } = useLocation()?.state
  const dispatch = useDispatch()
  const [dataQuestion, setDataQuestion] = React.useState()
  const [refEditor, setRefEditor] = React.useState(null)
  const [form] = Form.useForm()
  const [dataAnswer, setDataAnswer] = React.useState([])
  const handleFinishAnswer = value => {
    if (!user?._id) {
      notification.warning({
        message: 'Warning',
        description: 'Please login to answer this question !',
      })
      history.push('/auth/login')
    } else {
      QuestionApi.createAnswer(params.id, {
        content: convertToHTML(refEditor.getCurrentContent()),
      })
        .then(res => {
          const { status } = res
          console.log(res)
          if (status && status === 'success') {
            notification.success({
              message: 'Success',
              description: 'Create answer success !',
            })
          } else {
            notification.error({
              message: 'Error',
              description: 'Create answer error !',
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          getDataAnswer()
          form.resetFields()
        })
    }
  }

  const refetchCurrentUser = () => {
    dispatch({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
  }

  const handleLike = () => {
    QuestionApi.upvoteQuestion(params.id)
      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          getDataQuestion()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleDisLike = () => {
    QuestionApi.downvoteQuestion(params.id)

      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          getDataQuestion()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getDataQuestion = () => {
    QuestionApi.getQuestionById(params.id)
      .then(res => {
        const { status, data } = res
        if (status && status === 'success') {
          setDataQuestion(data.question)
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

  const getDataAnswer = () => {
    QuestionApi.getAllAnswer(params.id)
      .then(res => {
        const { status, data } = res
        if (status && status === 'success') {
          setDataAnswer(data.answers)
        } else {
          notification.error({
            message: 'Error',
            description: 'Get answer error !',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const closeQuestion = () => {
    try {
      QuestionApi.closeQuestion(params.id)
        .then(res => {
          console.log(res)
          const { status } = res
          if (status && status === 'success') {
            notification.success({
              message: 'Success',
              description: 'Close question success !',
            })
            getDataQuestion()
          } else {
            notification.error({
              message: 'Error',
              description: 'Close question error !',
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const reopenQuestion = () => {
    QuestionApi.reopenQuestion(params.id)

      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          notification.success({
            message: 'Success',
            description: 'Reopen question success !',
          })
          getDataQuestion()
        } else {
          notification.error({
            message: 'Error',
            description: 'Reopen question error !',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const saveQuestion = () => {
    QuestionApi.saveQuestion(params.id)
      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          notification.success({
            message: 'Success',
            // description: 'Save question success !',
          })
          refetchCurrentUser()
        } else {
          notification.error({
            message: 'Error',
            description: 'Save question error !',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDataAnswer()

    getDataQuestion()
  }, [])

  return (
    <>
      <Helmet title="Detail Question" />
      <div className="card">
        {// owner question
        dataQuestion?.creator_id?._id === user?._id && dataQuestion?.status === 'open' && (
          <div className="card-header">
            <Button type="primary">
              <Link
                to={{
                  pathname: `/questions/detail-question/${params.id}/edit-question`,
                  state: { dataQuestion },
                }}
              >
                Edit question
              </Link>
            </Button>
          </div>
        )}
        <div className="card-body">
          <div className="mb-2">
            <Badge.Ribbon
              text={dataQuestion?.status === 'open' ? 'Open' : 'Closed'}
              color={dataQuestion?.status === 'open' ? 'green' : 'red'}
            >
              <Tooltip title="Save question">
                <Button onClick={saveQuestion} type="link">
                  <i
                    style={{
                      color:
                        user?.saved_questions?.includes(params.id) || false ? '#ebae1c' : 'grey',
                    }}
                    className="fe fe-star mr-2 mb-2"
                  />
                </Button>
              </Tooltip>
              <div className="text-dark font-size-24 font-weight-bold">
                {dataQuestion?.title || 'Title'}
              </div>
            </Badge.Ribbon>
          </div>
          <div className="mb-3">
            <Link
              className="font-weight-bold"
              to={`/users/detail-user/${dataQuestion?.creator_id._id}`}
            >
              {dataQuestion?.creator_id?.name || 'Name'}
            </Link>{' '}
            asked this post {moment(dataQuestion?.created_date).fromNow()} ·{' '}
            {dataAnswer?.length || 0} comments .
            <a onClick={handleLike} className="text-blue mr-3">
              <i className="fa fa-heart mr-1" /> {dataQuestion?.up_vote_users.length || 0} Likes .{' '}
            </a>
            <a onClick={handleDisLike} className="text-blue mr-3">
              <i className="fa fa-heart-o mr-1 ml-4" /> {dataQuestion?.down_vote_users.length || 0}{' '}
              Dislikes
            </a>
          </div>
          <div className="mb-4">
            {dataQuestion?.tags?.map((item, index) => (
              <Link
                key={index}
                to={`/public/questions/all-questions?tag=${item._id}`}
                className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            <p>{dataQuestion?.description || 'Description'}</p>
          </div>
          <hr />
          <div>
            <h3>Detail</h3>
            <div dangerouslySetInnerHTML={{ __html: dataQuestion?.content }} />
          </div>
        </div>
      </div>
      <div className="card" style={{ height: '65vh', overflowY: 'scroll' }}>
        <div className="card-body">
          <h6 className="mb-4 text-uppercase">
            <strong>Answer ({dataAnswer.length || 0})</strong>
          </h6>
          {dataAnswer?.map((item, index) => (
            <General15
              refetchQuestion={getDataQuestion}
              refetchAnswer={getDataAnswer}
              creator_id_question={dataQuestion?.creator_id?._id}
              key={index}
              data={item}
              visiable={dataQuestion?.status === 'open'}
            />
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center flex-wrap border-bottom mb-3 pb-3">
            <div className="kit__utils__avatar kit__utils__avatar--size110 mr-3 mb-3 align-items-center flex-shrink-0">
              <img
                src={dataQuestion?.creator_id?.profile_image}
                alt={dataQuestion?.creator_id?.name}
              />
            </div>
            <div className="mb-3">
              <div className="font-weight-bold font-size-16 text-dark mb-2">
                {dataQuestion?.creator_id?.name}
              </div>
              <p className="font-italic">
                “I hope you enjoy reading this as much as I enjoyed writing this.”
              </p>
              <Link
                to={`/users/detail-user/${dataQuestion?.creator_id?._id}`}
                className="btn btn-sm btn-primary"
              >
                View Profile
              </Link>
            </div>
          </div>

          {dataQuestion?.status === 'open' ? (
            <>
              <h5 className="text-dark mb-4">Leave a answer</h5>
              <Form className="login-form" form={form} onFinish={handleFinishAnswer}>
                {/* <Form.Item name="userName">
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Your name"
              />
            </Form.Item>
            <Form.Item name="mail">
              <Input
                prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Your email"
              />
            </Form.Item> */}
                <div className="form-group">
                  <Form.Item
                    name="content"
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
                <Form.Item>
                  <Button className="mr-2" type="primary" htmlType="submit" style={{ width: 200 }}>
                    <i className="fa fa-send mr-2" />
                    Send
                  </Button>
                  {user && (
                    <Button
                      hidden={
                        dataQuestion?.creator_id?._id !== user?._id ||
                        dataQuestion?.accepted_answer_id != null
                      }
                      onClick={closeQuestion}
                      htmlType="button"
                      className="mr-2 btn btn-outline-success"
                      style={{ width: 200 }}
                    >
                      <i className="fa fa-check mr-2" />
                      Close
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </>
          ) : (
            <>
              {user && (
                <Button
                  onClick={reopenQuestion}
                  className="mr-2 btn btn-outline-primary"
                  style={{ width: 200 }}
                  hidden={
                    dataQuestion?.creator_id?._id !== user?._id ||
                    dataQuestion?.accepted_answer_id != null
                  }
                >
                  <i className="fa fa-check mr-2" />
                  Reopen
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default withRouter(connect(mapStateToProps)(DetailQuestion))
