import General1 from 'components/kit/widgets/General/1'
import React from 'react'
import { Link } from 'react-router-dom'

const CardInfoGroup = ({ action, data }) => {
  return (
    <>
      <div className="card kit__utils__cardMarked kit__utils__cardMarked--primary">
        <Link to="/public/questions/all-questions?group=asdfskfjnfkds">
          <div className="card-header card-header-flex">
            <div className="d-flex flex-column justify-content-center mr-auto">
              <h5 className="mb-0">{data.name}</h5>
            </div>
            {/* <div className="d-flex flex-column justify-content-center">
                <Dropdown overlay={dropdownMenu} placement="bottomRight">
                  <button type="button" className="btn btn-light">
                    <i className="fe fe-more-vertical" />
                  </button>
                </Dropdown>
              </div> */}
          </div>
        </Link>
        <div className="card-body">
          <General1 data={data} action={action} />
        </div>
      </div>
    </>
  )
}

export default CardInfoGroup
