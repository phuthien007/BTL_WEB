import { MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Tabs } from 'antd'
import General15 from 'components/kit/widgets/General/15'
import { Editor } from 'react-draft-wysiwyg'

import React from 'react'
import { Helmet } from 'react-helmet'
import { TabPane } from 'reactstrap'
import { Link } from 'react-router-dom'

const DetailQuestion = () => {
  return (
    <>
      <Helmet title="Detail Question" />
      <div className="card">
        <div className="card-body">
          <div className="mb-2">
            <Link
              to="/public/questions/detail-question/1"
              className="text-dark font-size-24 font-weight-bold"
            >
              [Feature Request] How to enable custom font that comes from svg #2460
            </Link>
          </div>
          <div className="mb-3">
            <Link className="font-weight-bold" to="/users/detail-user/1">
              zxs2162
            </Link>{' '}
            wrote this post 12 days ago
          </div>
          <div className="mb-4">
            <Link
              to="/public/questions/all-questions?tag=umi"
              className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
            >
              Umi
            </Link>
            <Link
              to="/public/questions/all-questions?tag=React-framework"
              className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
            >
              React-framework
            </Link>
            <Link
              to="/public/questions/all-questions?tag=Umijs"
              className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
            >
              Umijs
            </Link>
          </div>
          <div>
            <img
              className="img-fluid mb-4"
              src="/resources/images/content/photos/1.jpeg"
              alt="Sea"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum est
              perferendis consectetur corporis esse labore minima molestias, exercitationem
              consequuntur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum
              est perferendis consectetur corporis esse labore minima molestias, exercitationem
              consequuntur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum
              est perferendis consectetur corporis esse labore minima molestias, exercitationem
              consequuntur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum
              est perferendis consectetur corporis esse labore minima molestias, exercitationem
              consequuntur!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum est
              perferendis consectetur corporis esse labore minima molestias, exercitationem
              consequuntur! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum
              est perferendis consectetur corporis esse labore minima molestias, exercitationem
              consequuntur!
            </p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h6 className="mb-4 text-uppercase">
            <strong>Comments (76)</strong>
          </h6>
          <General15 />
          <a
            href="#"
            onClick={e => e.preventDefault()}
            className="d-block btn btn-light text-primary mt-3"
          >
            Load More
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center flex-wrap border-bottom mb-3 pb-3">
            <div className="kit__utils__avatar kit__utils__avatar--size110 mr-3 mb-3 align-items-center flex-shrink-0">
              <img src="/resources/images/avatars/5.jpg" alt="Mary Stanform" />
            </div>
            <div className="mb-3">
              <div className="font-weight-bold font-size-16 text-dark mb-2">Trinity Parson</div>
              <p className="font-italic">
                “I hope you enjoy reading this as much as I enjoyed writing this.”
              </p>
              <Link to="/users/detail-user/1" className="btn btn-sm btn-primary">
                View Profile
              </Link>
            </div>
          </div>
          <h5 className="text-dark mb-4">Leave a answer</h5>
          <Form className="login-form">
            <Form.Item name="userName">
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
            </Form.Item>
            <Form.Item name="message">
              <div className="card flex-grow-1">
                <Tabs className="kit-tabs-bordered pt-2 px-3" defaultActiveKey="1">
                  <TabPane tab="Write" key="1" />
                  <TabPane tab="Preview" key="2" />
                </Tabs>
                <div>
                  <Editor
                    toolbarClassName="border-0 px-3"
                    editorClassName="px-3"
                    editorStyle={{
                      height: 250,
                      overflow: 'auto',
                    }}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <Button className="mr-2" type="primary" style={{ width: 200 }}>
                <i className="fa fa-send mr-2" />
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default DetailQuestion
