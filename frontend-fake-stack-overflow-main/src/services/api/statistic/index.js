const { default: apiClient } = require('services/axios')

const StatisticApi = {
  // get all statistic
  getStatisticQuestionToday: () => {
    return apiClient
      .get('/question/today')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get all statistic answer
  getStatisticAnswerToday: () => {
    return apiClient
      .get('/question/today/answer')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get all statistic user
  getStatisticUserToday: () => {
    return apiClient
      .get('/question/today/user')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get all  question
  getCountAllQuestion: () => {
    return apiClient
      .get('/question/total')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  getCountAllUser: () => {
    return apiClient
      .get('/question/total/user')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  getCountAllQuestionAnswered: () => {
    return apiClient
      .get('/question/total/answered')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },
  getCountAllAnswer: () => {
    return apiClient
      .get('/question/total/answer')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },
}

export default StatisticApi
