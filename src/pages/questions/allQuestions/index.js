import { Button, Pagination, Radio, Select } from 'antd'
import CardQuestion from 'components/CardInfoQuestion'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const options = [
  {
    label: 'Newest',
    value: 'Apple',
  },
  {
    label: 'Active',
    value: 'Pear',
  },
  {
    label: 'Bountied',
    value: 'Orange',
  },
  {
    label: 'Unanswered',
    value: 'Orange',
  },
]
const AllQuestions = () => {
  // eslint-disable-next-line no-unused-vars
  function useQuery() {
    const { search } = useLocation()

    return React.useMemo(() => new URLSearchParams(search), [search])
  }
  const onChange3 = ({ target: { value } }) => {
    console.log('radio3 checked', value)
    setValue3(value)
  }
  const [value3, setValue3] = useState('Apple')
  const handleChange = value => {
    console.log(`selected ${value}`)
  }
  const query = useQuery()
  return (
    <>
      <div className="row header">
        <h3>All Questions</h3>
        <Button>
          <Link to="/questions/ask-question">Ask Question</Link>
        </Button>
      </div>
      <br />
      <div>
        <b>
          23,382,133 questions with filter: {value3}, tag ({query.get('tag')})
        </b>
      </div>
      <br />
      <div className="row filter">
        <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
        <Select
          defaultValue="lucy"
          style={{
            width: 250,
          }}
          placeholder="Sorted by"
          allowClear
          mode="multiple"
          onChange={handleChange}
          options={[
            {
              value: 'jack',
              label: 'Newest',
            },
            {
              value: 'lucy',
              label: 'Recent activity',
            },
            {
              value: 'disabled',
              label: 'Highest score',
            },
            {
              value: 'Yiminghe',
              label: 'Most frequent',
            },
            {
              value: 'Yiminghe',
              label: 'Bounty ending soon',
            },
          ]}
        />
        <Select
          defaultValue={query.get('tag')}
          style={{
            width: 250,
          }}
          placeholder="Search tag"
          allowClear
          mode="multiple"
          onChange={handleChange}
          options={[
            {
              value: 'jack',
              label: 'Newest',
            },
            {
              value: 'lucy',
              label: 'Recent activity',
            },
            {
              value: 'disabled',
              label: 'Highest score',
            },
            {
              value: 'Yiminghe',
              label: 'Most frequent',
            },
            {
              value: 'Yiminghe',
              label: 'Bounty ending soon',
            },
          ]}
        />
      </div>
      <br />
      <hr />
      <div className="row">
        <CardQuestion url="/public/questions/detail-question/1" />
        <CardQuestion url="/public/questions/detail-question/1" />
        <CardQuestion url="/public/questions/detail-question/1" />
        <CardQuestion url="/public/questions/detail-question/1" />
        <CardQuestion url="/public/questions/detail-question/1" />
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </>
  )
}

export default AllQuestions
