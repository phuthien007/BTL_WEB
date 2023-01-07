import { Pagination } from 'antd'
import CardInfoGroup from 'components/CardInfoGroup'
import React from 'react'
import { Helmet } from 'react-helmet'

const Groups = () => {
  return (
    <>
      <Helmet> Groups </Helmet>
      <CardInfoGroup />
      <CardInfoGroup />
      <CardInfoGroup />
      <CardInfoGroup />
      <CardInfoGroup />
      <CardInfoGroup />
      <Pagination total={50} defaultCurrent={1} />
    </>
  )
}

export default Groups
