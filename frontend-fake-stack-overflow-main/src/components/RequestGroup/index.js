import React from 'react'

const RequestGroup = () => {
  return (
    <div className="card">
      <div className="card-header">reuqest</div>
      <div className="card-body">
        request your group
        <button type="button" className="btn btn-outline-success">
          Accept
        </button>
        <button type="button" className="btn btn-outline-danger">
          Reject
        </button>
      </div>
    </div>
  )
}

export default RequestGroup
