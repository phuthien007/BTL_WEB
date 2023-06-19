/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Badge, Button, Input, Pagination, Radio, Select, notification } from 'antd'
import CardQuestion from 'components/CardInfoQuestion'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from 'services/api'

const options = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Newest',
    value: 'newest',
  },
  {
    label: 'Active',
    value: 'active',
  },

  {
    label: 'Closed',
    value: 'closed',
  },
]
const AllQuestions = () => {
  const [tagsOption, setTagsOption] = React.useState([])
  const [tags, setTags] = React.useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTag, setSearchTag] = useState([])
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])
  const [value3, setValue3] = useState('all')
  const onChange3 = ({ target: { value } }) => {
    setValue3(value)
  }
  // eslint-disable-next-line no-unused-vars
  function useQuery() {
    const { search } = useLocation()

    return React.useMemo(() => new URLSearchParams(search), [search])
  }
  const query = useQuery()

  const getDataTags = () => {
    api.TagApi.getAllTag({ sort: 'name,asc' }).then(res => {
      const data = res.data.tags.map(item => {
        return {
          label: item.name,
          value: item._id,
        }
      })
      setTags(data)
      setTagsOption(data)
    })
  }
  const getData = () => {
    const payload = {
      sort: 'created_date,desc',
    }
    if (value3) {
      switch (value3) {
        case 'newest':
          break
        case 'active':
          payload.status = 'open'
          break

        case 'closed':
          payload.status = 'closed'
          break

        default:
          break
      }
    }
    if (searchTag.length > 0) {
      payload.tags = searchTag
    }
    if (searchText) {
      payload.title = searchText
    }
    api.QuestionApi.getAllQuestion({ ...payload })
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
    getDataTags()
    getData()
  }, [value3, searchTag, searchText])

  useEffect(() => {
    setSearchTag(query.get('tag') ? [query.get('tag')] : [])
  }, [query])

  const handleChange = value => {
    console.log(`selected ${value}`)
    setSearchTag(value)
  }
  return (
    <>
      <div className="row header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>All Questions</h3>
        <Button className="btn btn-outline-primary">
          <Link to="/questions/ask-question">Ask Question</Link>
        </Button>
      </div>
      <br />
      <div>
        <b>{data.length || 0} questions</b>
      </div>
      <br />
      <div className="row filter" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          type="text"
          className="mb-3"
          placeholder="Search question"
        />
        <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />

        <Select
          value={searchTag}
          style={{
            width: 250,
          }}
          placeholder="Search tag"
          filterOption={(input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }}
          allowClear
          mode="multiple"
          onChange={handleChange}
          options={tagsOption}
        />
      </div>
      <br />
      <hr />
      <div className="row">
        {data?.length ? (
          <div className="col-lg-12">
            {data?.slice((currentPage - 1) * 5, currentPage * 5)?.map((item, index) => (
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
            pageSize={5}
            onChange={e => setCurrentPage(e)}
            total={data?.length}
          />
        ) : null}
        {/* {data.map((item, index) => (
          <CardQuestion url="/public/questions/detail-question/1" />
        ))} */}
      </div>
    </>
  )
}

export default AllQuestions
