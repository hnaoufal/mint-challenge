import AxiosClient from './AxiosClient';

export default class BaseApi {
  constructor(apiClient = AxiosClient) {
    this.apiClient = apiClient;
  }

  get = (...params) => this.apiClient.get(...params);

  post = (...params) => this.apiClient.post(...params);

  put = (...params) => this.apiClient.put(...params);

  patch = (...params) => this.apiClient.patch(...params);

  delete = (...params) => this.apiClient.delete(...params);
}
