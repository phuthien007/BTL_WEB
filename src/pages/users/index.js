import General17 from 'components/kit/widgets/General/17'
import General17v1 from 'components/kit/widgets/General/17v1'
import General17v2 from 'components/kit/widgets/General/17v2'
import React, { useState } from 'react'
import CardInfoUser from 'components/CardInfoUser'
import { Col, Input, Pagination, Radio } from 'antd'
import { Link } from 'react-router-dom'

const options = [
  {
    label: 'Reputation',
    value: 'Apple',
  },
  {
    label: 'New users',
    value: 'Pear',
  },
  {
    label: 'Voters',
    value: 'Orange',
  },
  {
    label: 'Editors',
    value: 'Orange',
  },
  {
    label: 'Moderators',
    value: 'Orange',
  },
]
const AllUsers = () => {
  const onChange3 = ({ target: { value } }) => {
    console.log('radio3 checked', value)
    setValue3(value)
  }
  const [value3, setValue3] = useState('Apple')
  return (
    <>
      <div className="cui__utils__heading mb-3">
        <strong>Top Users (3)</strong>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <Link to="/users/detail-user/1">
              <General17 />
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <Link to="/users/detail-user/1">
              <General17v1 />
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <Link to="/users/detail-user/1">
              <General17v2 />
            </Link>
          </div>
        </div>
      </div>
      <div className="cui__utils__heading mb-3">
        <strong>All Users (113)</strong>
      </div>
      <div className="row">
        <Col>
          <Input placeholder="name" />
        </Col>
        <Col>
          <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
        </Col>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        <Link to="/users/detail-user/1">
          <CardInfoUser />
        </Link>
        <Link to="/users/detail-user/1">
          <CardInfoUser />
        </Link>
        <Link to="/users/detail-user/1">
          <CardInfoUser />
        </Link>
        <Link to="/users/detail-user/1">
          <CardInfoUser />
        </Link>
        <Link to="/users/detail-user/1">
          <CardInfoUser />
        </Link>
        <Link to="/users/detail-user/1">
          <CardInfoUser />
        </Link>
        <Link to="/users/detail-user/1">
          <CardInfoUser />
        </Link>
      </div>
      <Pagination defaultCurrent={1} total={50} />
    </>
  )
}

export default AllUsers
