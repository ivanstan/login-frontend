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

    const response = await fetch(`/translations/messages.${this.locale}.json`)
    const data = await response.json()

    this._messages[this.locale] = data

    return data
  });

  @observable user: any = null;

  @action me() {
    user.me().then((response) => {
      console.log(response);
    });
  }

  @action async login(email: string, password: string) {
    const response = await user.login(email, password);

    if (response.status === 200) {
      const user = await response.json();

      this.user = user;

      return user;
    }

    throw await response.json();
  }
}

export const store = new Store();
