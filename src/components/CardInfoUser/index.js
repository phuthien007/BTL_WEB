import React from 'react'
import style from './style.module.scss'

const CardInfoUser = () => {
  return (
    <>
      <div className="card ml-3 mt-2">
        <div>
          <div className="position-relative py-3 px-4 text-center">
            <div className={`${style.flag}`}>100</div>
            <div className="font-size-70 pt-3 pb-w text-gray-4">
              <i className="fe fe-star" />
            </div>
            <h5 className="font-size-24 font-weight-bold mb-1">David Beckham</h5>
            <div className="font-size-18 text-uppercase mb-3">0941-xxx-xxx</div>

            <div className="border-top pt-3 font-italic">Created at 03/22</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardInfoUser
