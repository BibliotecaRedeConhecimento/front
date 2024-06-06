import { api } from "./api"

export const getAllKnowledges = async () => {
  const response = await api.get('/knowledges')
  return response
}