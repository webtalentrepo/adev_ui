import axios, { CancelToken } from 'axios'

const RequestManager = new class {
  constructor () {
    this.requests = {}
  }

  add (id, cancel) {
    if (this.requests[id]) {
      this.cancel(id)
    }
    this.requests[id] = cancel
  }

  remove (id) {
    delete this.requests[id]
  }

  cancel (id, reason) {
    if (typeof this.pendingRequests[id] === 'function') {
      this.id[id](reason)
      this.remove(id)
    }
  }

  cancelAll (reason) {
    for (let id in this.requests) {
      this.cancel(id, reason)
    }
  }
}()

axios.interceptors.request.use(config => {
  const { requestId, cancelToken } = config
  if (requestId && cancelToken) {
    const { token, cancel } = CancelToken.source()
    config.cancelToken = token
    RequestManager.add(requestId, cancel)
  }
  return config
})

axios.interceptors.response.use(response => {
  const { requestId } = response.config
  if (requestId) {
    RequestManager.remove(requestId)
  }
  return response
})

export const { cancel, cancelAll } = RequestManager

const LISTENERS = Symbol('__LISTENERS__')
const PROMISE = Symbol('__PROMISE__')

class Request {
  constructor (config = {}) {
    if (config.requestId) {
      this.cancel = reason => RequestManager.cancel(config.requestId, reason)
    } else {
      const { token, cancel } = CancelToken.source()
      config.cancelToken = token
      this.cancel = cancel
    }
    this[PROMISE] = new Promise((resolve, reject) => {
      config.onUploadProgress = progress =>
        this[LISTENERS].forEach(listener =>
          listener.call(null, progress, 'upload')
        )
      config.onDownloadProgress = progress =>
        this[LISTENERS].forEach(listener =>
          listener.call(null, progress, 'download')
        )
      axios(config).then(resolve, reject)
    })
    this[LISTENERS] = []
  }

  then (resolve, reject) {
    this[PROMISE] = this[PROMISE].then(resolve, reject)
    return this
  }

  catch (reject) {
    this[PROMISE] = this[PROMISE].catch(r => reject(r))
    return this
  }

  finally (callback) {
    return this.then(callback, callback)
  }

  progress (handler) {
    if (typeof handler !== 'function') {
      throw new Error('PROGRESS_REQUIRES_FUNCTION')
    }
    this[LISTENERS].push(handler)
    return this
  }
}

export default {
  get: (url, config) => new Request({ ...config, url, method: 'get' }),
  delete: (url, config) => new Request({ ...config, url, method: 'delete' }),
  head: (url, config) => new Request({ ...config, url, method: 'head' }),
  options: (url, config) => new Request({ ...config, url, method: 'options' }),
  post: (url, data, config) =>
    new Request({ ...config, data, url, method: 'post' }),
  put: (url, data, config) =>
    new Request({ ...config, data, url, method: 'put' }),
  patch: (url, data, config) =>
    new Request({ ...config, data, url, method: 'patch' })
}
