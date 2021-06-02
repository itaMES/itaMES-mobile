import BaseStorage from './base.storage';
import { USER_INFO } from './keys';


class UserStorage extends BaseStorage {
  constructor() {
    super();
  }

  getUserInfo = () => this.get(USER_INFO);

  setUserInfo = (user: object) => this.set(USER_INFO, user);

  removeUserInfo = () => this.remove(USER_INFO);

}


export default new UserStorage();