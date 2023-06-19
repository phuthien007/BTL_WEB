const { default: apiClient } = require('services/axios')

const QuestionApi = {
  // get all question
  getAllQuestion: payload => {
    return apiClient
      .get('/question', { params: payload })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // create new question
  createQuestion: payload => {
    return apiClient
      .post('/question', payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // update question
  updateQuestion: (id, payload) => {
    return apiClient
      .patch(`/question/${id}`, payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // delete question
  deleteQuestion: id => {
    return apiClient
      .delete(`/question/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // upvote question
  upvoteQuestion: id => {
    return apiClient
      .patch(`/question/${id}/upVote`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // uptove answer for this question
  upvoteAnswer: (id, answerId) => {
    return apiClient
      .patch(`/question/${id}/upVote/answer`, { answerId })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // downvote answer for this question
  downvoteAnswer: (id, answerId) => {
    return apiClient
      .patch(`/question/${id}/downVote/answer`, { answerId })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // downvote question
  downvoteQuestion: id => {
    return apiClient
      .patch(`/question/${id}/downVote`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // accept an answer
  acceptAnswer: (id, payload) => {
    return apiClient
      .patch(`/question/${id}/accept`, payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // close a question
  closeQuestion: id => {
    return apiClient
      .patch(`/question/${id}/close`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get all answer for this question
  getAllAnswer: (id, payload) => {
    return apiClient
      .get(`/question/${id}/answer`, { params: payload })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // create an answer for this question
  createAnswer: (id, payload) => {
    return apiClient
      .post(`/question/${id}/answer`, payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // delete answer
  deleteAnswer: (id, answerId) => {
    return apiClient
      .delete(`/question/${id}/answer/${answerId}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // reopen a question
  reopenQuestion: id => {
    return apiClient
      .patch(`/question/${id}/reopen`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  approveAnswer: (id, payload) => {
    return apiClient
      .patch(`/question/${id}/accept`, payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get all question by user
  getAllQuestionByUser: payload => {
    return apiClient
      .get(`/question/user`, { params: payload })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // getQuestionById
  getQuestionById: id => {
    return apiClient
      .get(`/question/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // save question
  saveQuestion: id => {
    return apiClient
      .patch(`/question/${id}/save`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },
}

export default QuestionApi
