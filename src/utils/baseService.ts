import qs from 'qs';
import env from '@env';
import { API_TYPE } from '@utils/constants';
import { request } from './request';

type URL = {
  id?: number | string;
  path?: string;
};

/**
 * @Author Phu Le
 * @Description The base service to call API
 */
export class BaseService {
  pathname: string;
  type: string;
  constructor(pathName: string, type = '') {
    this.pathname = pathName;
    this.type = type;
  }
  /**
   * @Usage
   * Excluding search method
   * URLs is a array include id and path
   * The first item must be an object with only id property
   * eg: this.pathname is "locations"
   * - [] => http://192.168.80.61:8181/locations
   * - [ {id: 2} ]
   *    => http://192.168.80.61:8181/locations/2
   * - [ {id: 2}, {id: 1, path: 'checkpoint'} ]
   *    => http://192.168.80.61:8181/locations/2/checkpoint/1
   * - [{ id: 2 }, { path: "checkpoint" }, { path: 'search'}];
   *    => http://192.168.80.61:8181/locations/2/checkpoint/search
   */

  baseUrl(URLs: URL[] = []): string {
    const { core, product, warehouse, export: exportPort } = env.API_URL;
    let url = core;
    let paths = '';

    switch (this.type) {
      case API_TYPE.PRODUCT:
        url = product;
        break;
      case API_TYPE.WAREHOUSE:
        url = warehouse;
        break;
      case API_TYPE.EXPORT:
        url = exportPort;
        break;
      default:
        url = core;
        break;
    }

    if (Array.isArray(URLs)) {
      URLs.map((item: URL) => {
        const { id, path = this.pathname } = item;
        paths = `${paths}${path ? `/${path}` : ''}${id ? `/${id}` : ''}`;
        return true;
      });
    }
    url = `${url}${paths || this.pathname}`;

    return url.toString();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItem(URLs: URL[], queryParams = {}): any {
    let url = this.baseUrl(URLs);
    if (Object.keys(queryParams).length > 0) {
      url += `?${qs.stringify(queryParams, { encode: false })}`;
    }
    return request(url, 'GET');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getByQuery(query: string): any {
    const url = `${this.baseUrl()}/${query}`;
    return request(url, 'GET');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItems(queryParams = {}): any {
    let url = this.baseUrl();
    if (Object.keys(queryParams).length > 0) {
      url += `?${qs.stringify(queryParams, { encode: false })}`;
    }
    return request(url, 'GET');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(data: object, midURL: URL[] | string = '', queryParams = {}): any {
    const typeURL = typeof midURL === 'string';
    let url = typeURL ? this.baseUrl() + midURL : this.baseUrl(midURL);
    if (Object.keys(queryParams).length > 0) {
      url += `?${qs.stringify(queryParams, { encode: false })}`;
    }
    return request(url, 'POST', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  search(data: object = {}, midURL: URL[] | string = ''): any {
    const typeURL = typeof midURL === 'string';
    const url = typeURL ? this.baseUrl() + midURL : this.baseUrl(midURL);
    return request(url, 'POST', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(data: object, URLs: URL[] = []): any {
    const url = this.baseUrl(URLs);
    return request(url, 'PUT', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateNoId(data: object): any {
    const url = this.baseUrl();
    return request(url, 'PUT', data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete(URLs: URL[]): any {
    const url = this.baseUrl(URLs);
    return request(url, 'DELETE');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getItemsNoEndCode(queryParams = {}): any {
    let url = this.baseUrl();
    if (Object.keys(queryParams).length > 0) {
      url += `?${qs.stringify(queryParams, { encode: false })}`;
    }
    return request(url, 'GET');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload(data: object, queryParams = '', urls?: []): any {
    let url = this.baseUrl(urls);
    url = queryParams ? `${url}?${queryParams}` : url;
    return request(url, 'POST', data, true);
  }
}
