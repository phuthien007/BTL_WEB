const { default: apiClient } = require('services/axios')

const GroupApi = {
  // get all Group
  getAllGroup: payload => {
    return apiClient
      .get('/group', { params: payload })
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get Group by id
  getGroupById: id => {
    return apiClient
      .get(`/group/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // delete Group
  deleteGroup: id => {
    return apiClient
      .delete(`/group/${id}`)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  getAllMyGroup: () => {
    return apiClient
      .get('/group/me/group')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get all my group and group i joined
  getAllMyGroupAndJoined: () => {
    return apiClient
      .get('/group/me/group')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get others group
  getOthersGroup: () => {
    return apiClient
      .get('/group/others')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get my request to join group
  getMyRequestToJoinGroup: () => {
    return apiClient
      .get('/group/me/request')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },

  // get request to join my group
  getRequestToJoinMyGroup: () => {
    return apiClient
      .get('/group/me/group/request')
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  },
}

export default GroupApi
