import {User as UserModel} from '../model/User';
import {plainToClass} from "class-transformer";

class User {
  public me = async () => {
    const response = await fetch('http://localhost/login-backend/public/users/me', {
      credentials: 'include'
    });

    if (response && response.status !== 200) {
      return null;
    }

    const user = await response.json();

    return plainToClass(UserModel, user);
  };

  public login = async (email: string, password: string) => {
    const response = await fetch('http://localhost/login-backend/public/login', {
      method: 'post',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `email=${email}&password=${password}`,
    });

    if (response && response.status !== 200) {
      throw response;
    }

    const user = await response.json();

    return plainToClass(UserModel, user);
  };

  public async logout() {
    const response = await fetch('http://localhost/login-backend/public/logout');
    return await response.json();
  }
}

export const user = new User();
