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
    url: 'http://localhost:3000/api' + url,
    method,
    data,
    responseType: 'json',
    headers: additionalHeaders,
  })
    .then((response) => response.data)
    .catch((e) => {
      if (!e.response) {
        return { status: 500, message: e.code }
      }
      return e.response?.data
    })
  return res
}
export default apiRequest
