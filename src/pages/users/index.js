/* eslint-disable no-underscore-dangle */
import General17 from 'components/kit/widgets/General/17'
import General17v1 from 'components/kit/widgets/General/17v1'
import General17v2 from 'components/kit/widgets/General/17v2'
import React, { useEffect, useState } from 'react'
import CardInfoUser from 'components/CardInfoUser'
import { Col, Input, Pagination, Radio, notification } from 'antd'
import { Link } from 'react-router-dom'
import api from 'services/api'

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
  const [username, setUsername] = useState(null)
  const [dataUser, setDataUser] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const getData = () => {
    // const data = []
    // call api
    api.UserApi.getAllUsers({ username, status: 'active' })
      .then(res => {
        const { data, status } = res
        if (status === 'success') {
          setDataUser(data)
          setCurrentPage(1)
        } else {
          notification.warning({
            message: 'Error',
            description: 'Error when fetching data',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    // return { data, status }
  }

  useEffect(() => {
    getData()
  }, [username])

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
        <strong>All Users ({dataUser?.users?.length || 0})</strong>
      </div>
      <div style={{ marginLeft: 10 }} className="row">
        <Col>
          <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="name" />
        </Col>
        <br />
        <Col>
          <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
        </Col>
      </div>
      {dataUser?.users?.length ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {dataUser?.users?.slice((currentPage - 1) * 2, currentPage * 2)?.map((item, index) => (
            <Link key={index} to={`/users/detail-user/${item._id}`}>
              <CardInfoUser data={item} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No found user match with search</p>
      )}
      {dataUser?.users?.length ? (
        <Pagination
          current={currentPage}
          pageSize={2}
          onChange={e => setCurrentPage(e)}
          total={dataUser?.users?.length}
        />
      ) : null}
    </>
  )
}

export default AllUsers
