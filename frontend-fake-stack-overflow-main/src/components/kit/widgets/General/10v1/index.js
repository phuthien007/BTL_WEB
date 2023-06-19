import React from 'react'
// import style from './style.module.scss'

const General10v1 = ({ data }) => {
  return (
    <div className="d-flex flex-wrap flex-column align-items-center">
      <div className="kit__utils__avatar kit__utils__avatar--size64 mb-3">
        <img src={data.avatar} alt="Mary Stanform" />
      </div>
      <div className="text-center">
        <div className="text-dark font-weight-bold font-size-18">{data.fullName}</div>
        <div className="text-uppercase font-size-12 mb-3">{data.email}</div>
        <div className="text-uppercase font-size-12 mb-3">{data.phone}</div>
        <div className="text-uppercase font-size-12 mb-3">{data.address}</div>

        {/* <div className="mb-3">
          <button type="button" className="btn btn-success mr-2">
            <i className="fa fa-plus mr-2 mt-2" />
            Follow
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default General10v1
