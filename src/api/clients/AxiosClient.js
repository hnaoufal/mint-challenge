import axios from 'axios';

class AxiosClient {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  static handleApiError(error) {
    throw error;
  }

  get = (url, opt) =>
    axios.get(`${this.rootPath}${url}`, this.apiBuilder(null, opt))
      .then(res => res)
      .catch(this.handleApiError);

  post = (url, data, opt) =>
    axios.post(`${this.rootPath}${url}`, this.apiBuilder(data, opt))
      .then(res => res)
      .catch(this.handleApiError);

  put = (url, data, opt) =>
    axios.put(`${this.rootPath}${url}`, this.apiBuilder(data, opt))
      .then(res => res)
      .catch(this.handleApiError);

  patch = (url, data, opt) =>
    axios.path(`${this.rootPath}${url}`, this.apiBuilder(data, opt))
      .then(res => res)
      .catch(this.handleApiError);

  delete = (url, opt) =>
    axios.delete(`${this.rootPath}${url}`, this.apiBuilder(null, opt))
      .then(res => res)
      .catch(this.handleApiError);

  apiBuilder = (data, opt = {}) => ({
      data,
      ...opt
    });
}

export default new AxiosClient(`${process.env.APIHOST}/`);
