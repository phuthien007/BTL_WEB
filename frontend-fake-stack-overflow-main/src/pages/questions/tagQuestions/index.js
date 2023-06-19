/* eslint-disable no-nested-ternary */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Pagination, Radio, notification } from 'antd'
import Search from 'antd/lib/input/Search'
import List5 from 'components/kit/widgets/Lists/5'
import React, { useEffect, useState } from 'react'
import api from 'services/api'

const options = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Popular',
    value: 'popular',
  },
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'New',
    value: 'new',
  },
]
const TagQuestions = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [data, setData] = useState([])
  const onChange3 = ({ target: { value } }) => {
    setValue3(value)
  }

  const getData = () => {
    const payload = {
      // sort: 'name,1',
      searchText: searchText && searchText.length ? searchText : undefined,
      sort: value3 === 'name' ? 'name,1' : value3 === 'new' ? 'created_date,-1' : 'created_date,1',
    }

    api.TagApi.getAllTag({
      ...payload,
    })
      .then(res => {
        const { status, data } = res
        if (status && status === 'success') {
          setData(data.tags)
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
  const [value3, setValue3] = useState('all')

  useEffect(() => {
    getData()
  }, [searchText, value3])

  return (
    <>
      <h3>Tags</h3>
      <p>
        A tag is a keyword or label that categorizes your question with other, similar questions.
        Using the right tags makes it easier for others to find and answer your question.
      </p>
      <div className="row">
        <div className="col-xl-9 col-lg-12">
          <Search
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Filter by tag name"
            width="100%"
          />
        </div>
        <div className="col-xl-3 col-lg-12">
          <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
        </div>
      </div>
      <hr />
      <div className="row">
        {data?.length ? (
          <>
            <div className="col-lg-4">
              <List5 data={data?.slice((currentPage - 1) * 15, currentPage * 15).slice(0, 5)} />
            </div>
            <div className="col-lg-4">
              <List5 data={data?.slice((currentPage - 1) * 15, currentPage * 15).slice(5, 10)} />
            </div>
            <div className="col-lg-4">
              <List5 data={data?.slice((currentPage - 1) * 15, currentPage * 15).slice(10, 15)} />
            </div>
          </>
        ) : (
          <p className="text-center mt-4">No found question match with search</p>
        )}
      </div>
      {data?.length ? (
        <Pagination
          current={currentPage}
          showSizeChanger={false}
          pageSize={15}
          onChange={e => setCurrentPage(e)}
          total={data?.length}
        />
      ) : null}
    </>
  )
}

export default TagQuestions
