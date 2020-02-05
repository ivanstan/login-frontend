import {Hydra} from "./Hydra";

export class UserStore extends Hydra {

  private baseUrl: string = 'http://localhost/login-backend/public/api';
  private resource: string = 'users';

  public get(id: number) {
    return this.request('GET', this.baseUrl + '/users/' + id);
  }

  public new() {

  }

  public collection() {
    const response = this.request('GET', this.baseUrl + '/users');

    console.log(response);
  }

  public delete() {

  }

  public update(user: any) {
    return this.request('PATCH', this.baseUrl + '/users/' + user.id, [], user);
  }

}

export const User = new UserStore();
