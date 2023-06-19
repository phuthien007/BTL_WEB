/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react'
import { Menu, Dropdown, notification } from 'antd'
import moment from 'moment'
import UserApi from 'services/api/user'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import QuestionApi from 'services/api/question'

const mapStateToProps = ({ user }) => ({ user })

const General15 = ({
  refetchAnswer,
  refetchQuestion,
  data,
  visiable,
  creator_id_question,
  user,
}) => {
  const deleteAnswer = () => {
    QuestionApi.deleteAnswer(data.question_id._id, data._id)
      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          notification.success({
            message: 'Success',
            description: 'Delete answer success !',
          })
          refetchAnswer()
        } else {
          notification.error({
            message: 'Error',
            description: 'Delete answer error !',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const approveAnswer = () => {
    QuestionApi.approveAnswer(data.question_id._id, {
      answerId: data._id,
    })

      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          notification.success({
            message: 'Success',
            description: 'Approve answer success !',
          })
          refetchAnswer()
          refetchQuestion()
        } else {
          notification.error({
            message: 'Error',
            description: 'Approve answer error !',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const dropdownMenu = (
    <Menu>
      <Menu.Item hidden={data?.creator_id._id !== user._id}>
        <a onClick={deleteAnswer}>
          <i className="dropdown-icon fe fe-trash mr-1" /> Delete Answer
        </a>
      </Menu.Item>
      <Menu.Item hidden={creator_id_question !== user?._id}>
        <a onClick={approveAnswer}>
          <i className="dropdown-icon fe fe-check mr-1" /> Approve Answer
        </a>
      </Menu.Item>
    </Menu>
  )

  const handleLike = () => {
    QuestionApi.upvoteAnswer(data.question_id._id, data._id)
      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          refetchAnswer()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleDisLike = () => {
    QuestionApi.downvoteAnswer(data.question_id._id, data._id)

      .then(res => {
        const { status } = res
        if (status && status === 'success') {
          refetchAnswer()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="d-flex flex-nowrap align-items-start pt-4">
      <div className="kit__utils__avatar kit__utils__avatar--size64 mr-4 flex-shrink-0 align-self-start">
        <img src={data?.creator_id.profile_image} alt={data?.creator_id.name} />
      </div>
      <div className="flex-grow-1">
        <div className="border-bottom">
          <div className="d-flex flex-wrap mb-2">
            <div className="mr-auto">
              <Link to={`/users/detail-user/${data?.creator_id._id}`}>
                <div className="text-gray-6">
                  <span className="text-dark font-weight-bold">{data?.creator_id.name}</span> posted
                </div>
              </Link>
              <div>{moment(data.created_date).fromNow()}</div>
              {data.status === 'approved' && (
                <b style={{ fontSize: '20px' }}>
                  <i className="fa fa-check-circle text-success mr-1" style={{ color: 'green' }} />
                  Approved
                </b>
              )}
            </div>
            {visiable && (
              <div className="nav-item dropdown">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <a className="nav-link dropdown-toggle pt-sm-0">Actions</a>
                </Dropdown>
              </div>
            )}
          </div>
          <div className="mb-3" dangerouslySetInnerHTML={{ __html: data.content }} />
          <div className="d-flex flex-wrap justify-content-start align-items-start mb-3">
            <a onClick={handleLike} className="text-blue mr-3">
              <i className="fa fa-heart mr-1" /> {data.up_vote_users.length} Likes
            </a>
            <a onClick={handleDisLike} className="text-blue mr-3">
              <i className="fa fa-heart-o mr-1 ml-4" /> {data.down_vote_users.length} Dislikes
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(General15))
