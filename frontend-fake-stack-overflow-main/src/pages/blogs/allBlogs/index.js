import React from 'react'
import { Helmet } from 'react-helmet'
import { Button, Pagination } from 'antd'
import List15 from 'components/kit/widgets/Lists/15'
// import { Link } from 'react-router-dom'
import CardQuestion from 'components/CardInfoQuestion'

const AllBlogs = () => {
  return (
    <div>
      <Helmet title="Blog Posts" />

      <div className="row">
        <div className="col-xl-9 col-lg-12">
          <CardQuestion url="/public/blogs/detail-blog/1" />
          <CardQuestion url="/public/blogs/detail-blog/2" />
          <CardQuestion url="/public/blogs/detail-blog/3" />
          <CardQuestion url="/public/blogs/detail-blog/4" />
          <CardQuestion url="/public/blogs/detail-blog/5" />
          <Pagination defaultCurrent={1} total={50} />
        </div>
        <div className="col-xl-3 col-lg-12">
          <div className="pb-4 mb-3 border-bottom">
            <Button>Post Blog</Button>
            <label className="font-weight-bold d-block" htmlFor="search-input">
              <span className="mb-2 d-inline-block">Search Post</span>
              <input
                className="form-control width-100p"
                type="text"
                placeholder="Search post..."
                id="search-input"
              />
            </label>
          </div>
          <div className="pb-4 mb-3 border-bottom">
            <label className="font-weight-bold d-block" htmlFor="subscribe-input">
              <span className="mb-2 d-inline-block">Subscribe</span>
              <input
                className="form-control width-100p"
                type="text"
                id="subscribe-input"
                placeholder="Enter your email..."
              />
            </label>
          </div>
          <div className="pb-4 mb-3 border-bottom">
            <div className="font-weight-bold mb-2">Categories</div>
            <div>
              <a
                href="#"
                onClick={e => e.preventDefault()}
                className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
              >
                Umi
              </a>
              <a
                href="#"
                onClick={e => e.preventDefault()}
                className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
              >
                React-framework
              </a>
              <a
                href="#"
                onClick={e => e.preventDefault()}
                className="badge text-blue text-uppercase bg-light font-size-12 mr-2"
              >
                Umijs
              </a>
            </div>
          </div>
          <div className="pb-4 mb-3 border-bottom">
            <div className="font-weight-bold mb-3">Latest Posts</div>
            <List15 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllBlogs
