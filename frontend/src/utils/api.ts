import axios, { AxiosError, Method } from 'axios'

interface APIOptions {
  baseUrl: string
  headers: Record<string, string>
}

export interface MineCell {
  mine: boolean
  clue: number | null
  x: number
  y: number
}

export type Minefield = MineCell[][]

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
        message:
          typeof err.response?.data === 'object' && (err.response?.data as unknown)?.message
            ? (err.response?.data as unknown).message
            : err.message,
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
