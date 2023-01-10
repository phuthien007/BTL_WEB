import { Pagination, Radio } from 'antd'
import Search from 'antd/lib/input/Search'
import List5 from 'components/kit/widgets/Lists/5'
import React, { useState } from 'react'

const options = [
  {
    label: 'Popular',
    value: 'Apple',
  },
  {
    label: 'Name',
    value: 'Pear',
  },
  {
    label: 'New',
    value: 'Orange',
  },
]
const TagQuestions = () => {
  const onChange3 = ({ target: { value } }) => {
    console.log('radio3 checked', value)
    setValue3(value)
  }
  const [value3, setValue3] = useState('Apple')
  return (
    <>
      <h3>Tags</h3>
      <p>
        A tag is a keyword or label that categorizes your question with other, similar questions.
        Using the right tags makes it easier for others to find and answer your question.
      </p>
      <div className="row">
        <div className="col-xl-9 col-lg-12">
          <Search placeholder="Filter by tag name" width="100%" />
        </div>
        <div className="col-xl-3 col-lg-12">
          <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-4">
          <List5 />
        </div>
        <div className="col-lg-4">
          <List5 />
        </div>
        <div className="col-lg-4">
          <List5 />
        </div>
      </div>
      <Pagination defaultCurrent={1} total={50} />
    </>
  )
}

export default TagQuestions
