import { request } from './http'

export const getUsers = () => request('/users')

export const getUserById = (id) => request(`/users/${id}`)

export const createUser = (data) =>
  request('/users', { method: 'POST', body: JSON.stringify(data) })

export const updateUser = (id, data) =>
  request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteUser = (id) =>
  request(`/users/${id}`, { method: 'DELETE' })
