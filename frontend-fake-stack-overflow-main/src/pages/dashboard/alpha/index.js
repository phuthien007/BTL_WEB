/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Badge, Button, Pagination, Table, notification } from 'antd'
import Chart4 from 'components/kit/widgets/Charts/4'
import Chart4v1 from 'components/kit/widgets/Charts/4v1'
import Chart4v2 from 'components/kit/widgets/Charts/4v2'
import Chart4v3 from 'components/kit/widgets/Charts/4v3'
import Chart11 from 'components/kit/widgets/Charts/11'
import Chart11v1 from 'components/kit/widgets/Charts/11v1'
import Chart11v2 from 'components/kit/widgets/Charts/11v2'
import General17 from 'components/kit/widgets/General/17'
import General17v1 from 'components/kit/widgets/General/17v1'
import General17v2 from 'components/kit/widgets/General/17v2'
import General18 from 'components/kit/widgets/General/18'
import General18v1 from 'components/kit/widgets/General/18v1'
import General6 from 'components/kit/widgets/General/6'
import General6v1 from 'components/kit/widgets/General/6v1'
import CardQuestion from 'components/CardInfoQuestion'
import { Link } from 'react-router-dom'
import { tableData } from './data.json'
import UserApi from 'services/api/user'
import QuestionApi from 'services/api/question'
import StatisticApi from 'services/api/statistic'

const DashboardAlpha = () => {
  const [topUser, setTopUser] = useState([])
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // {
  //   totalQuestion: 0,
  //   totalAnswer: 0,
  //   totalUser: 0,
  //   totalQuestionAnswered: 0,
  //   todayQuestion: 0,
  //   todayAnswer: 0,
  //   todayUser: 0,
  // }
  const [totalQuestion, setTotalQuestion] = useState(0)
  const [totalAnswer, setTotalAnswer] = useState(0)
  const [totalUser, setTotalUser] = useState(0)
  const [totalQuestionAnswered, setTotalQuestionAnswered] = useState(0)
  const [todayQuestion, setTodayQuestion] = useState(0)
  const [todayAnswer, setTodayAnswer] = useState(0)
  const [todayUser, setTodayUser] = useState(0)
  const getCountAllQuestion = () => {
    StatisticApi.getCountAllQuestion()
      .then(res => {
        const { data: countAllQuestion, status } = res
        if (status === 'success') {
          setTotalQuestion(countAllQuestion.count)
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
  const getCountAllAnswer = () => {
    StatisticApi.getCountAllAnswer()
      .then(res => {
        const { data, status } = res
        if (status === 'success') {
          setTotalAnswer(data.count)
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
  const getCountAllQuestionAnswered = () => {
    StatisticApi.getCountAllQuestionAnswered()
      .then(res => {
        const { data, status } = res
        if (status === 'success') {
          setTotalQuestionAnswered(data.count)
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

  const getCountAllUser = () => {
    StatisticApi.getCountAllUser()
      .then(res => {
        const { data, status } = res
        if (status === 'success') {
          setTotalUser(data.count)
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

  const getStatisticUserToday = () => {
    StatisticApi.getStatisticUserToday()
      .then(res => {
        const { data, status } = res
        if (status === 'success') {
          setTodayUser(data.count)
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

  const getStatisticAnswerToday = () => {
    StatisticApi.getStatisticAnswerToday()
      .then(res => {
        const { data, status } = res
        if (status === 'success') {
          setTodayAnswer(data.count)
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

  const getStatisticQuestionToday = () => {
    StatisticApi.getStatisticQuestionToday()
      .then(res => {
        const { data, status } = res
        if (status === 'success') {
          setTodayQuestion(data.count)
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

  const getTopUser = () => {
    UserApi.getTopUser()
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
  const getData = () => {
    const payload = {
      sort: 'created_date,desc',
    }

    QuestionApi.getAllQuestion({ ...payload })
      .then(res => {
        const { status, data } = res
        if (status && status === 'success') {
          setData(data.questions)
          setCurrentPage(1)
        } else {
          notification.error({
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
    getCountAllAnswer()
    getCountAllQuestionAnswered()
    getCountAllUser()
    getStatisticUserToday()
    getStatisticAnswerToday()
    getStatisticQuestionToday()
    getTopUser()
    getCountAllQuestion()
    getData()
  }, [])

  return (
    <div>
      <Helmet title="Dashboard: Analytics" />
      <div className="cui__utils__heading">
        <strong>Today Statistics</strong>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <Chart11 count={todayQuestion} />
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <Chart11v1 count={todayAnswer} />
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <Chart11v2 count={todayUser} />
          </div>
        </div>
      </div>
      <div className="cui__utils__heading">
        <strong>Total Statistics</strong>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-6">
          <div className="card">
            <div className="card-body">
              <Chart4 count={totalQuestion} />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card">
            <div className="card-body">
              <Chart4v1 count={totalQuestionAnswered} />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card">
            <div className="card-body">
              <Chart4v2 count={totalAnswer} />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card">
            <div className="card-body">
              <Chart4v3 count={totalUser} />
            </div>
          </div>
        </div>
      </div>

      <div className="cui__utils__heading mb-3">
        <strong>Top Users (3)</strong>
        <Button className="ml-3">
          {' '}
          <Link to="/users/all-users">View All</Link>
        </Button>
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
        <strong>Recently Questions</strong>
        <Button className="ml-3">
          <Link to="/public/questions/all-questions">View All</Link>
        </Button>
      </div>
      <div className="row">
        {data?.length ? (
          <div className="col-lg-12">
            {data?.slice((currentPage - 1) * 2, currentPage * 2)?.map((item, index) => (
              <Badge.Ribbon
                key={index}
                text={item.status === 'open' ? 'OPEN' : 'CLOSED'}
                color={item.status === 'open' ? 'green' : 'red'}
              >
                <CardQuestion data={item} url={`/public/questions/detail-question/${item._id}`} />
              </Badge.Ribbon>
            ))}
          </div>
        ) : (
          <p className="text-center mt-4">No found question match with search</p>
        )}
        {data?.length ? (
          <Pagination
            current={currentPage}
            pageSize={2}
            onChange={e => setCurrentPage(e)}
            total={data?.length}
          />
        ) : null}
        {/* {data.map((item, index) => (
          <CardQuestion url="/public/questions/detail-question/1" />
        ))} */}
      </div>
    </div>
  )
}

export default DashboardAlpha
