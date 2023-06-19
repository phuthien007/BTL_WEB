import { Badge, Pagination } from 'antd'
import CardInfoGroup from 'components/CardInfoGroup'
import GroupForm from 'components/GroupForm'
import React from 'react'
import { Helmet } from 'react-helmet'

const Groups = () => {
  const data = {
    id: '1',
    name: 'Group 1',
    status: 'private',
    description: 'Group 1 description',
    created_at: '2021-05-01T00:00:00.000Z',
    updated_at: '2021-05-01T00:00:00.000Z',
    deleted_at: null,
    user_id: '1',
    user: {
      id: '1',
      name: 'User 1',
    },
    blogs: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    questions: [
      {
        id: '1',
      },
      {
        id: '2',
      },
    ],
    members: [
      {
        id: '1',
      },
      {
        id: '2',
      },
    ],
  }
  return (
    <>
      <Helmet> Groups </Helmet>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div
              className="card-header"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <span>Your group</span>
              <GroupForm type="add" />
            </div>
            <div className="card-body">
              <Badge.Ribbon className="text-uppercase" text={data.status} color="volcano">
                <CardInfoGroup data={data} action={{ type: 'Leave group' }} />
              </Badge.Ribbon>
              <Pagination total={50} defaultCurrent={1} />
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card">
            <div className="card-header">Discover Groups</div>
            <div className="card-body">
              <Badge.Ribbon className="text-uppercase" text="public" color="green">
                <CardInfoGroup data={data} action={{ type: 'Join group' }} />
              </Badge.Ribbon>
              <CardInfoGroup data={data} action={{ type: 'Join group' }} />
              <CardInfoGroup data={data} action={{ type: 'Join group' }} />
              <CardInfoGroup data={data} action={{ type: 'Join group' }} />
              <CardInfoGroup data={data} action={{ type: 'Join group' }} />
              <Pagination total={50} defaultCurrent={1} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Groups
