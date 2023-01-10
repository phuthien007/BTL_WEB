const { default: apiClient } = require('services/axios')

const UserApi = {
  // Get all users

  getAllUsers: payload => {
    return apiClient
      .get('/user', { params: payload })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // Get user by id
  getUserById: id => {
    return apiClient
      .get(`/user/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // Create new user
  createUser: payload => {
    return apiClient
      .post('/user', payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // Update user
  updateUser: (id, payload) => {
    return apiClient
      .put(`/user/${id}`, payload)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // Delete user
  deleteUser: id => {
    return apiClient
      .delete(`/user/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },
}

export default UserApi
