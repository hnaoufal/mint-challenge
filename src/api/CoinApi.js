import BaseApi from './clients/BaseApi';

class coinsApi extends BaseApi {
  getTicker = nr => this.get(`v2/ticker/?limit=${nr}`);
}

export default new coinsApi();
