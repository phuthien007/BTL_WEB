/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Tabs, Input, Button, Upload, Form, Pagination, Badge } from 'antd'
// import General1 from 'components/kit/widgets/General/1'
import General10v1 from 'components/kit/widgets/General/10v1'
import List19 from 'components/kit/widgets/Lists/19'
import CardQuestion from 'components/CardInfoQuestion'
import CardInfoGroup from 'components/CardInfoGroup'
import RequestGroup from 'components/RequestGroup'
import QuestionApi from 'services/api/question'
import GroupApi from 'services/api/group'
import { useParams } from 'react-router-dom'
import UserApi from 'services/api/user'
import AnswerApi from 'services/api/answer'

const { TabPane } = Tabs

const DetailUser = () => {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage1, setCurrentPage1] = useState(1)

  const [tabKey, setTabKey] = useState('1')
  const [questionData, setQuestionData] = useState([])
  // const [groupData, setGroupData] = useState([])
  const [answerData, setAnswerData] = useState([])
  const [userData, setUserData] = useState([])
  const changeTab = key => {
    setTabKey(key)
  }

  const fetchQuestions = () => {
    QuestionApi.getAllQuestionByUser({
      creator_id: id,
    })
      .then(res => {
        const { status, data } = res
        if (status && status === 'success') {
          setQuestionData(data.questions)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchUser = () => {
    UserApi.getUserById(id)
      .then(res => {
        const { status, data } = res
        if (status && status === 'success') {
          setUserData(data.user)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchAnswers = () => {
    AnswerApi.getAllAnswer({
      creator_id: id,
      sort: 'created_date,desc',
    })
      .then(res => {
        const { status, data } = res
        if (status && status === 'success') {
          setAnswerData(data.answers)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // const fetchGroups = () => {
  //   GroupApi.getAllGroup({
  //     creator: id,
  //   })
  //     .then(res => {
  //       const { status, data } = res
  //       if (status && status === 'success') {
  //         setGroupData(data.groups)
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  useEffect(() => {
    fetchUser()
    fetchQuestions()
    // fetchGroups()
    fetchAnswers()
  }, [])

  return (
    <div>
      <Helmet title="Profile" />
      <div className="row">
        <div className="col-xl-4 col-lg-12">
          <div className="card">
            <div className="card-body">
              <General10v1
                data={{
                  fullName: userData?.name,
                  avatar: userData?.profile_image,
                  email: userData?.email,
                  phone: userData?.phone,
                  address: userData?.address,
                  reputation: userData?.reputation,
                }}
              />
            </div>
          </div>

          {/* <div className="card">
            <div className="card-body">
              <General1 />
            </div>
          </div> */}
          <div className="card" style={{ height: '80vh', overflowY: 'scroll' }}>
            <div className="card-body">
              {answerData.length === 0 ? (
                <div className="text-center">
                  <h3>No recently activities</h3>
                </div>
              ) : (
                <List19 data={answerData} />
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-12">
          <div className="card">
            <div className="card-header card-header-flex flex-column">
              <div className="d-flex flex-wrap border-bottom pt-3 pb-4 mb-3">
                <div className="mr-5">
                  <div className="text-dark font-size-18 font-weight-bold">Reputation</div>
                  <div className="text-gray-6">{userData?.reputation}</div>
                </div>
                <div className="mr-5 text-center">
                  <div className="text-dark font-size-18 font-weight-bold">
                    {questionData.length}
                  </div>
                  <div className="text-gray-6">Questions</div>
                </div>
                {/* <div className="mr-5 text-center">
                  <div className="text-dark font-size-18 font-weight-bold">{data.blogs.length}</div>
                  <div className="text-gray-6">Blogs</div>
                </div> */}
                {/* <div className="mr-5 text-center">
                  <div className="text-dark font-size-18 font-weight-bold">
                    {data.saved_posts.length}
                  </div>
                  <div className="text-gray-6">Saved Blogs</div>
                </div> */}
                {/* <div className="mr-5 text-center">
                  <div className="text-dark font-size-18 font-weight-bold">
                    {data.saved_questions.length}
                  </div>
                  <div className="text-gray-6">Saved Questions</div>
                </div> */}
                {/* <div className="mr-5 text-center">
                  <div className="text-dark font-size-18 font-weight-bold">{data.follower}</div>
                  <div className="text-gray-6">Followers</div>
                </div> */}
              </div>
              <Tabs activeKey={tabKey} className="mr-auto kit-tabs-bold" onChange={changeTab}>
                {/* <TabPane tab="Settings" key="0" /> */}
                <TabPane tab="Questions" key="1" />
                {/* <TabPane tab="Blogs" key="2" /> */}
                {/* <TabPane tab="Saved questions" key="3" /> */}
                {/* <TabPane tab="Saved blogs" key="4" /> */}
                {/* <TabPane tab="Groups" key="5" /> */}
              </Tabs>
            </div>
            <div className="card-body">
              {tabKey === '1' && (
                <>
                  <div style={{ height: '87vh', overflowY: 'scroll' }}>
                    <div className="row  mr-2">
                      {questionData?.length ? (
                        <div className="col-lg-12">
                          {questionData
                            ?.slice((currentPage - 1) * 5, currentPage * 5)
                            ?.map((item, index) => (
                              <Badge.Ribbon
                                key={index}
                                text={item.status === 'open' ? 'OPEN' : 'CLOSED'}
                                color={item.status === 'open' ? 'green' : 'red'}
                              >
                                <CardQuestion
                                  data={item}
                                  url={`/public/questions/detail-question/${item._id}`}
                                />
                              </Badge.Ribbon>
                            ))}
                        </div>
                      ) : (
                        <p className="text-center mt-4 ml-4">No found question match with search</p>
                      )}

                      {/* {data.map((item, index) => (
          <CardQuestion url="/public/questions/detail-question/1" />
        ))} */}
                    </div>
                  </div>
                  {questionData?.length ? (
                    <Pagination
                      className="mt-2"
                      current={currentPage}
                      pageSize={5}
                      onChange={e => setCurrentPage(e)}
                      total={questionData?.length}
                    />
                  ) : null}
                </>
              )}
              {/* {tabKey === '2' && (
                <div style={{ height: '87vh', overflowY: 'scroll' }}>
                  {data.blogs.map((item, index) => (
                    <CardQuestion data={item} key={index} />
                  ))}
                  <Pagination defaultCurrent={2} total={20} />
                </div>
              )} */}
              {/* {tabKey === '3' && (
                <div style={{ height: '87vh', overflowY: 'scroll' }}>
                  {data.saved_questions.map((item, index) => (
                    <CardQuestion data={item} key={index} />
                  ))}
                  <Pagination defaultCurrent={2} total={20} />
                </div>
              )}
              {tabKey === '4' && (
                <div style={{ height: '87vh', overflowY: 'scroll' }}>
                  {data.saved_posts.map((item, index) => (
                    <CardQuestion data={item} key={index} />
                  ))}
                  <Pagination defaultCurrent={2} total={20} />
                </div>
              )} */}
              {/* {tabKey === '5' && (
                <>
                  <div style={{ height: '87vh', overflowY: 'scroll' }}>
                    <div className="card">
                      <div className="card-body">
                        {groupData?.length ? (
                          <div>
                            {groupData
                              ?.slice((currentPage1 - 1) * 5, currentPage1 * 5)
                              ?.map((item, index) => (
                                <Badge.Ribbon
                                  key={index}
                                  className="text-uppercase"
                                  text={item.is_public ? 'Public' : 'Private'}
                                  color={item.is_public ? 'green' : 'red'}
                                >
                                  <CardInfoGroup data={item} action={{ type: 'Join group' }} />
                                </Badge.Ribbon>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center mt-4">No found user match with search</p>
                        )}
                      </div>
                    </div>
                  </div>
                  {groupData?.length ? (
                    <Pagination
                      current={currentPage1}
                      pageSize={5}
                      className="mt-2"
                      onChange={e => setCurrentPage1(e)}
                      total={groupData?.length}
                    />
                  ) : null}
                </>
              )} */}
              {/* {tabKey === '0' && (
                <Form layout="vertical" className="login-form">
                  <h5 className="text-black mt-4">
                    <strong>Personal Information</strong>
                  </h5>
                  <div className="row">
                    <div className="col-lg-6">
                      <Form.Item name="fullname" label="Fullname">
                        <Input placeholder="Fullname" />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6">
                      <Form.Item name="email" label="Email">
                        <Input placeholder="Email" />
                      </Form.Item>
                    </div>
                  </div>
                  <h5 className="text-black mt-4">
                    <strong>New Password</strong>
                  </h5>
                  <Form.Item label="Old Password">
                    <Input placeholder="Old password" />
                  </Form.Item>
                  <div className="row">
                    <div className="col-lg-6">
                      <Form.Item label="Password">
                        <Input placeholder="New password" />
                      </Form.Item>
                    </div>
                    <div className="col-lg-6">
                      <Form.Item name="confirmpassword" label="Confirm Password">
                        <Input placeholder="Confirm password" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <h5 className="text-black mt-4 mb-3">
                        <strong>Profile Avatar</strong>
                      </h5>
                      <Upload>
                        <Button>
                          <i className="fe fe-upload mr-2" /> Click to Upload
                        </Button>
                      </Upload>
                    </div>
                  </div>
                  <div className="form-actions">
                    <Button
                      style={{ width: 200 }}
                      type="primary"
                      htmlType="submit"
                      className="mr-3"
                    >
                      Submit
                    </Button>
                    <Button htmlType="submit">Cancel</Button>
                  </div>
                </Form>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailUser
