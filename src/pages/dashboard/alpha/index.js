/* eslint-disable no-unused-vars */
import React from 'react'
import { Helmet } from 'react-helmet'
import { Button, Pagination, Table } from 'antd'
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

const tableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Office',
    dataIndex: 'office',
    key: 'office',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    sorter: (a, b) => a.salary - b.salary,
  },
]

const DashboardAlpha = () => {
  return (
    <div>
      <Helmet title="Dashboard: Analytics" />
      <div className="cui__utils__heading">
        <strong>Today Statistics</strong>
      </div>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <Chart11 />
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <Chart11v1 />
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <Chart11v2 />
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
              <Chart4 />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card">
            <div className="card-body">
              <Chart4v1 />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card">
            <div className="card-body">
              <Chart4v2 />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6">
          <div className="card">
            <div className="card-body">
              <Chart4v3 />
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
            <General17 />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <General17v1 />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <General17v2 />
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
        <CardQuestion />
        <CardQuestion />
        <CardQuestion />
        <CardQuestion />
        <CardQuestion />
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  )
}

export default DashboardAlpha
