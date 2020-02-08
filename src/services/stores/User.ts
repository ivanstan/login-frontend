import {Hydra} from "./Hydra";
import {plainToClass} from "class-transformer";
import {User} from '../../model/User';

export class UserStore extends Hydra {

  private baseUrl: string = 'http://localhost/login-backend/public/api';
  private resource: string = 'users';

  public async get(id: number): Promise<User | null> {
    const response = await this.request('GET', this.baseUrl + '/users/' + id);

    if (response.status !== 200) {
      return null;
    }

    const user = await response.json();

    return plainToClass(User, user);
  }

  public async new(user: User) {
    const response = await this.request('POST', this.baseUrl + '/users/', [], user);
    return await response.json();
  }

  public async collection(): Promise<User[]> {
    const result: User[] = [];
    const response = await this.request('GET', this.baseUrl + '/users');

    if (response.status !== 200) {
      return result;
    }

    const data = await response.json();

    console.log(data);

    return data;
  }

  public async delete(user: User) {
    const response = await this.request('DELETE', this.baseUrl + '/users/' + user.id);
    return await response.json();
  }

  public async update(user: User) {
    const response = await this.request('PATCH', this.baseUrl + '/users/' + user.id, [], user);

    if (response.status !== 200) {
      return null;
    }

    const userEdited = await response.json();

    return plainToClass(User, userEdited);
  }

}

export const userStore = new UserStore();
