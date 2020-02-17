import { action, observable, configure } from 'mobx';
import { user } from '../User';
import { User } from '../../model/User';

configure({ enforceActions: 'never' });

class Store {

  @observable user: User = new User();

  @action me = async () => {
    const userModel = await user.me();

    if (userModel) {
      this.user = userModel;
    }

    return this.user;
  };

  @action login = async (email: string, password: string) => {
    try {
      const userModel: User = await user.login(email, password);

      if (userModel !== null) {
        this.user = userModel;
      }
    } catch (response) {
      throw response;
    }
  };

  @action logout = async () => {
    try {
      const userModel = await user.logout();
      this.user = new User();
    } catch (response) {
      throw response;
    }
  };
}

export const store = new Store();
