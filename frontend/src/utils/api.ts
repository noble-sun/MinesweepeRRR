import axios, { AxiosError, Method } from 'axios'

interface APIOptions {
  baseUrl: string
  headers?: Record<string, string>
}

interface APIError {
  status: number
  message: string
}

export interface MineCell {
  mine: boolean
  clue: number | null
  x: number
  y: number
}

export type Minefield = MineCell[][]

function isAPIErrorResponse(data: unknown): data is { message: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
  )
}

class API {
  private _url: string
  private _headers: Record<string, string>

  constructor(options: APIOptions) {
    this._url = options.baseUrl
    this._headers = options.headers || { 'Content-Type': 'application/json' }
  }

  private async _makeRequest<T = unknown>(
    endpoint: string,
    method: Method = 'GET',
    body: unknown = null,
  ): Promise<T> {
    try {
      const response = await axios({
        url: `${this._url}${endpoint}`,
        method,
        headers: this._headers,
        data: body,
      })

      return response.data
    } catch (error) {
      const err = error as AxiosError

      const errorData: APIError = {
        status: err.response?.status || 500,
        message: isAPIErrorResponse(err.response?.data) ? err.response!.data.message : err.message,
      }

      return Promise.reject(errorData)
    }
  }

  public generateMinefield(): Promise<Minefield> {
    return this._makeRequest('/minesweepers/generate', 'GET')
  }
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const minesweeperApi = new API({ baseUrl: API_URL })

export default minesweeperApi
