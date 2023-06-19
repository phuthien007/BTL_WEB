/* eslint-disable no-underscore-dangle */
import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

const List5 = ({ data }) => {
  return (
    <div>
      <ul className="list-unstyled">
        {data.map(item => (
          <li key={item._id} className={style.item}>
            <Link to={`/public/questions/all-questions?tag=${item._id}`} className={style.itemLink}>
              <div className={style.itemPic}>
                <i className="fe fe-file-text" />
              </div>
              <div className="mr-2">
                <div>{item.name}</div>
                <div className="text-muted">{moment(item.created_date).fromNow()}</div>
              </div>
              <div className={style.itemAction}>
                <span />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List5
