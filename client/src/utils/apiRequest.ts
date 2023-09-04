import axios from 'axios'

type IMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

const apiRequest = async (
  url: string,
  method: IMethod = 'GET',
  data: object = {},
  additionalHeaders: object = {},
) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  additionalHeaders = { ...defaultHeaders, ...additionalHeaders }

  const res = await axios({
    // url: '//localhost:3000/api' + url,
    url: import.meta.env.VITE_FRONT_API_URL + url,
    method,
    data,
    responseType: 'json',
    headers: additionalHeaders,
  })
    .then((response) => response)
    .catch((e) => {
      if (!e.response) {
        return {
          status: 500,
          data: {
            status: 500,
            message: e.code,
          },
        }
      }
      return e.response
    })
  return res
}
export default apiRequest
