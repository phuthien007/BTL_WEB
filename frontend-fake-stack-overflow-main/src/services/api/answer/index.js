const { default: apiClient } = require('services/axios')

const AnswerApi = {
  // get all answer
  getAllAnswer: payload => {
    return apiClient
      .get('/answer', { params: payload })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get answer by id
  getAnswerById: id => {
    return apiClient
      .get(`/answer/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // delete answer
  deleteAnswer: id => {
    return apiClient
      .delete(`/answer/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // update answer
  updateAnswer: (id, payload) => {
    apiClient
      .patch(`/answer/${id}`, payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // upvote answer
  upvoteAnswer: id => {
    return apiClient
      .patch(`/answer/${id}/upVote`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // downvote answer
  downvoteAnswer: id => {
    return apiClient
      .patch(`/answer/${id}/downVote`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },
}

export default AnswerApi
