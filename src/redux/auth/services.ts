import { BaseService } from '@utils/baseService';
import { LoginRequestPayload } from './types';

class AuthServices extends BaseService {
  constructor(pathName: string) {
    super(pathName);
    this.pathname = pathName;
  }

  login = (values: LoginRequestPayload) => this.create(values);
  logout = () => this.create({});
}

const loginServices = new AuthServices('security/login');
const logoutServices = new AuthServices('security/logout');

export { loginServices, logoutServices };
