import {action, computed, observable} from 'mobx'
import {promisedComputed} from 'computed-async-mobx'
import {user} from '../User';

class Store {
  @observable locale = window.localStorage.getItem('locale') || 'en';

  @computed get messages() {
    return this.getMessagesAsync.get()
  }

  private _messages: any = {};

  private getMessagesAsync = promisedComputed({}, async () => {
    if (typeof this._messages[this.locale] !== 'undefined') {
      return this._messages[this.locale]
    }

    const response = await fetch(`/translations/messages.${this.locale}.json`);
    const data = await response.json();

    this._messages[this.locale] = data;

    return data
  });

  @observable user: any = null;

  @action async me() {
    const userModel = await user.me();

    if (userModel) {
      this.user = userModel;
    }

    return this.user;
  }

  @action
  async login(email: string, password: string) {
    try {
      const userModel = await user.login(email, password);

      if (userModel !== null) {
        this.user = userModel;
      }
    } catch (response) {
        throw response;
    }
  }
}

export const store = new Store();
