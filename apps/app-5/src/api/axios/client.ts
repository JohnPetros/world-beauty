import Axios, { type AxiosResponse } from 'axios'

import type { IApiClient } from '@world-beauty/core/interfaces'
import { ApiResponse } from '@world-beauty/core/responses'
import { handleAxiosError } from './utils/handle-axios-error'

export const AxiosApiClient = (): IApiClient => {
  const axios = Axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  function sendResponse<ResponseBody>(response: AxiosResponse) {
    clearParams()
    return new ApiResponse<ResponseBody>({
      body: response.data,
      statusCode: response.status,
    })
  }

  function clearParams() {
    axios.defaults.params = {}
  }

  return {
    async get<ResponseBody>(url: string) {
      try {
        console.log(axios.defaults.params)
        const response = await axios.get(url)
        return sendResponse<ResponseBody>(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    async post<ResponseBody>(
      url: string,
      body: unknown,
    ): Promise<ApiResponse<ResponseBody>> {
      try {
        const response = await axios.post(url, body)
        return sendResponse(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    async put<ResponseBody>(
      url: string,
      body: unknown,
    ): Promise<ApiResponse<ResponseBody>> {
      try {
        const response = await axios.put(url, body)
        return sendResponse(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    async patch<ResponseBody>(
      url: string,
      body?: unknown,
    ): Promise<ApiResponse<ResponseBody>> {
      try {
        const response = await axios.patch(url, body)
        return sendResponse(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    async delete<ResponseBody>(
      url: string,
      body?: unknown,
    ): Promise<ApiResponse<ResponseBody>> {
      try {
        const response = await axios.delete(url, { data: body })
        return sendResponse(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    setHeader(key: string, value: string): void {
      axios.defaults.headers[key] = value
    },

    setParam(key: string, value: string): void {
      if (axios.defaults.params && key in axios.defaults.params) {
        axios.defaults.params = {
          [key]: axios.defaults.params[key].concat(`,${value}`),
          ...axios.defaults.params,
        }

        return
      }

      axios.defaults.params = {
        [key]: value,
        ...axios.defaults.params,
      }
    },

    setBaseUrl(url: string): void {
      axios.defaults.baseURL = url
    },
  }
}
