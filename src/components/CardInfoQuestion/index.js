import React from 'react'
import { Link } from 'react-router-dom'

const CardQuestion = ({ url }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-2">
          <i className="fe fe-star mr-2 mb-2" />
          <Link to={url || '#'} className="text-dark font-size-24 font-weight-bold">
            [Feature Request] How to enable custom font that comes from svg #2460
          </Link>
        </div>
        <div className="mb-3">
          <Link className="font-weight-bold" to="/users/detail-user/1">
            zxs2162
          </Link>{' '}
          asked this post 12 days ago · 0 comments . 0 likes
        </div>
        <div className="mb-4">
          <Link
            to="/public/questions/all-questions?tag=umi"
            className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
          >
            Umi
          </Link>
          <Link
            to="/public/questions/all-questions?tag=React-framework"
            className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
          >
            React-framework
          </Link>
          <Link
            to="/public/questions/all-questions?tag=Umijs"
            className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
          >
            Umijs
          </Link>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum est perferendis
            consectetur corporis esse labore minima molestias, exercitationem consequuntur! Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum est perferendis
            consectetur corporis esse labore minima molestias, exercitationem consequuntur! Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum est perferendis
            consectetur corporis esse labore minima molestias, exercitationem consequuntur! Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum est perferendis
            consectetur corporis esse labore minima molestias, exercitationem consequuntur!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum est perferendis
            consectetur corporis esse labore minima molestias, exercitationem consequuntur! Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Nihil laborum est perferendis
            consectetur corporis esse labore minima molestias, exercitationem consequuntur!
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardQuestion
