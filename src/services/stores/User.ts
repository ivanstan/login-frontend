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

  public new() {

  }

  public async collection(): Promise<User[]> {
    const result: User[] = [];
    const response = await this.request('GET', this.baseUrl + '/users');

    if (response.status !== 200) {
      return result;
    }

    const users = response.json();

    console.log(users);

    return result;
  }

  public delete() {

  }

  public async update(user: any) {
    const response = await this.request('PATCH', this.baseUrl + '/users/' + user.id, [], user);

    if (response.status !== 200) {
      return null;
    }

    const userEdited = await response.json();

    return plainToClass(User, userEdited);
  }

}

export const userStore = new UserStore();
