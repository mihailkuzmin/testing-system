export type Request = {
  get: <R>(url: string) => Promise<Response<R>>
  post: <P, R>(url: string, payload?: P) => Promise<Response<R>>
  put: <P, R>(url: string, payload?: P) => Promise<Response<R>>
  delete: <P, R>(url: string, payload?: P) => Promise<Response<R>>
}

export type Response<T> = { payload: T; message: string }
