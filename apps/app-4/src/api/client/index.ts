import type { IApiClient } from '@world-beauty/core/interfaces'
import { ApiResponse } from '@world-beauty/core/responses'

import { handleApiError } from '../utils'

export const ApiClient = (): IApiClient => {
  let baseUrl: string
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  let params: Record<string, string> = {}

  return {
    async get<ResponseBody>(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}/${url}`, {
        method: 'GET',
        headers,
        body: JSON.stringify(body),
      })
      params = {}
      const data = await response.json()

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async post<ResponseBody>(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body) ?? {},
      })
      params = {}
      const data = await response.json()

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async put<ResponseBody>(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}/${url}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body) ?? {},
      })
      params = {}
      const data = await response.json()

      if (!response.ok) {
        return handleApiError<ResponseBody>(data, response.status)
      }

      return new ApiResponse<ResponseBody>({
        body: data,
        statusCode: response.status,
      })
    },

    async delete(url: string, body: unknown) {
      const response = await fetch(`${baseUrl}/${url}`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(body),
      })
      params = {}
      const data = await response.json()

      if (!response.ok) {
        return handleApiError(data, response.status)
      }

      return new ApiResponse({
        body: data,
        statusCode: response.status,
      })
    },

    setBaseUrl(url: string) {
      baseUrl = url
    },

    setHeader(key: string, value: string) {
      headers[key] = value
    },

    setParam(key: string, value: string) {
      params[key] = value
    },
  }
}
