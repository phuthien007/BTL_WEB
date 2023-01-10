import General1 from 'components/kit/widgets/General/1'
import React from 'react'

const CardInfoGroup = () => {
  return (
    <>
      <div className="card kit__utils__cardMarked kit__utils__cardMarked--primary">
        <div className="card-header card-header-flex">
          <div className="d-flex flex-column justify-content-center mr-auto">
            <h5 className="mb-0">Revenue</h5>
          </div>
          {/* <div className="d-flex flex-column justify-content-center">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <button type="button" className="btn btn-light">
                    <i className="fe fe-more-vertical" />
                  </button>
                </Dropdown>
              </div> */}
        </div>
        <div className="card-body">
          <General1 />
        </div>
      </div>
    </>
  )
}

export default CardInfoGroup
