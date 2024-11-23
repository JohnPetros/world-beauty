import { isAxiosError } from 'axios'

import { ApiResponse } from '@world-beauty/core/responses'

export function handleAxiosError<ResponseBody>(axiosError: unknown) {
  if (isAxiosError(axiosError)) {
    console.log('Axios Error: ')
    console.log(axiosError.response?.data.message)
    return new ApiResponse({
      errorMessage: axiosError.response?.data.message,
      statusCode: axiosError.response?.status,
    }) as ApiResponse<ResponseBody>
  }

  console.log(`Unknown Error: ${axiosError}`)
  return new ApiResponse({
    errorMessage: 'Unknown error',
    statusCode: 500,
  }) as ApiResponse<ResponseBody>
}
