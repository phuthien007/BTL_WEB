/* eslint-disable no-shadow */
import FormEditQuestion from 'components/FormEditQuestion'
import React from 'react'
import { useParams } from 'react-router-dom'

const EditQuestion = () => {
  const { id } = useParams()

  return (
    <div>
      <FormEditQuestion id={id} />
    </div>
  )
}

export default EditQuestion
