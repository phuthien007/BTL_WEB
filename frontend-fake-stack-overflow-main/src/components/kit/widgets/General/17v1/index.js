/* eslint-disable camelcase */
import React from 'react'
import moment from 'moment'
import { DATE_FORMAT } from 'services/utils'
import style from './style.module.scss'

const General17v1 = ({ data }) => {
  return (
    <div>
      <div className="position-relative py-3 px-4 text-center">
        <div className={`${style.flag}`}>{data?.reputation}</div>
        <div className="font-size-70 pt-3 pb-w text-gray-4">
          <i className="fe fe-star" />
        </div>
        <h5 className="font-size-24 font-weight-bold mb-1">{data?.name}</h5>
        <div className="font-size-18 text-uppercase mb-3">{data?.email}</div>
        <div className="font-weight-bold font-size-18 text-uppercase mb-4">
          <i className="fa fa-trophy" style={{ color: '#e7951b' }} />
        </div>
        <div className="border-top pt-3 font-italic">
          {' '}
          Created at {moment(data?.created_at).format(DATE_FORMAT)}
        </div>
      </div>
    </div>
  )
}

export default General17v1
