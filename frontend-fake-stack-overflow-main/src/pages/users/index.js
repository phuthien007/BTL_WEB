/* eslint-disable no-unused-vars */
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
    value: 'reputation',
  },
  {
    label: 'New users',
    value: 'new-users',
  },
  {
    label: 'Questions',
    value: 'questions',
  },
  {
    label: 'Blogs',
    value: 'blogs',
  },
  // {
  //   label: 'Moderators',
  //   value: 'Orange',
  // },
]
const AllUsers = () => {
  const [topUser, setTopUser] = useState([])
  const [username, setUsername] = useState(null)
  const [dataUser, setDataUser] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const getData = () => {
    // const data = []
    // call api
    const payload = {
      status: 'active',
    }
    if (username && username.length > 0) {
      payload.username = username
    } else {
      payload.username = undefined
    }
    api.UserApi.getAllUsers({ ...payload })
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

  const getTopUser = () => {
    api.UserApi.getTopUser()
      .then(res => {
        const { data, status } = res
        if (status === 'success') {
          setTopUser(data.users)
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
  }

  useEffect(() => {
    getData()
    getTopUser()
  }, [username])

  return (
    <>
      <div className="cui__utils__heading mb-3">
        <strong>Top Users (3)</strong>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <Link to={`/users/detail-user/${(topUser && topUser[1]?._id) || 1}`}>
              <General17 data={topUser[1]} />
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <Link to={`/users/detail-user/${(topUser && topUser[0]?._id) || 1}`}>
              <General17v1 data={topUser[0]} />
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <Link to={`/users/detail-user/${(topUser && topUser[2]?._id) || 1}`}>
              <General17v2 data={topUser[2]} />
            </Link>
          </div>
        </div>
      </div>
      <div className="cui__utils__heading mb-3">
        <strong>All Users ({dataUser?.users?.length || 0})</strong>
      </div>
      <div
        style={{ marginLeft: 10, display: 'flex', justifyContent: 'space-between' }}
        className="row"
      >
        <Col>
          <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="name" />
        </Col>
        {/* <Col>
          <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
        </Col> */}
      </div>
      {dataUser?.users?.length ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {dataUser?.users?.slice((currentPage - 1) * 5, currentPage * 5)?.map((item, index) => (
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
          pageSize={5}
          onChange={e => setCurrentPage(e)}
          total={dataUser?.users?.length}
        />
      ) : null}
    </>
  )
}

export default AllUsers
