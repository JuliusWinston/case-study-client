import { base_url } from "../constants/intex"
import { QueryProps } from "../types"
import { createQueryParams } from "../utils"

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${base_url}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getArticles = async (token: string, query: QueryProps) => {
  const defaultQuery = { per_page: 12 }
  const queryParams = createQueryParams({ ...defaultQuery, ...query })

  try {
    const response = await fetch(`${base_url}articles${queryParams}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      credentials: "include"
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const getArticle = async (token: string, articleId: string) => {
  try {
    const response = await fetch(`${base_url}articles/${articleId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      credentials: "include"
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
