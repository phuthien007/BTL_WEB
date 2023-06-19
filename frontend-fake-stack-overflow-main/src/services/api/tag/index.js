const { default: apiClient } = require('services/axios')

const TagApi = {
  // get all tag
  getAllTag: payload => {
    return apiClient
      .get('/tag', { params: payload })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get tag by id
  getTagById: id => {
    return apiClient
      .get(`/tag/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // create new tag
  createTag: payload => {
    return apiClient
      .post('/tag', payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },
}

export default TagApi
