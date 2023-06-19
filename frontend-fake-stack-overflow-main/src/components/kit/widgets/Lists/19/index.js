/* eslint-disable react/no-array-index-key */
import React from 'react'
import moment from 'moment'
import { DATETIME_FORMAT } from 'services/utils'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

const List19 = ({ data }) => {
  return (
    <ul className="list-unstyled">
      {data.map((item, index) => (
        <li key={index} className={style.item}>
          <div className={`${style.itemTime} mr-3`} style={{ width: '20%' }}>
            <Link to={`/public/questions/detail-question/${item.id}`}>
              {item.question_id?.title}
            </Link>
          </div>
          <div className={style.itemSeparator}>
            <div className={`${style.donut} ${style.danger} mr-3`} />
          </div>
          <div style={{ width: '60%' }}>
            <p>{moment(item.created_date).format(DATETIME_FORMAT)}</p>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  item.content.lengh > 50 ? `${item.content.substring(0, 50)}...` : item.content,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default List19
