/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const CardQuestion = ({ url, data }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-2">
          <i className="fe fe-star mr-2 mb-2" />
          <Link
            to={{ pathname: url, state: { data } }}
            className="text-dark font-size-24 font-weight-bold"
          >
            {data?.title || 'Title'}
          </Link>
        </div>
        <div className="mb-3">
          <Link className="font-weight-bold" to={`/users/detail-user/${data?.creator_id?._id}`}>
            {data?.creator_id?.name}
          </Link>{' '}
          asked this post {moment(data?.created_date).fromNow()} · {data?.answers?.length || 0}{' '}
          answers . {data?.up_vote_users.length || 0} Likes . {data?.down_vote_users.length || 0}{' '}
          DisLikes
        </div>
        <div className="mb-4">
          {data?.tags?.map((item, index) => (
            <Link
              key={index}
              to={`/public/questions/all-questions?tag=${item._id}`}
              className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <p>
            {data?.description?.length > 100
              ? `${data?.description?.slice(0, 100)}...`
              : data?.description || 'Description'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardQuestion
