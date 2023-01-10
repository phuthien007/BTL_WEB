import React from 'react'
import { Link } from 'react-router-dom'

const General1 = () => {
  return (
    <div>
      <p className="text-dark font-size-48 font-weight-bold mb-2">$29,931</p>
      <p className="text-uppercase text-muted mb-3">Revenue today</p>
      <p className="mb-4">
        Lorem ipsum dolor sit amit,consectetur eiusmdd tempory incididunt ut labore et dolore magna
        elit
      </p>
      <a className="btn btn-outline-primary mb-1">Join group</a>
      <Link to="/public/groups/detail-group/1 " className="btn btn-outline-primary mb-1">
        View group
      </Link>
    </div>
  )
}

export default General1
