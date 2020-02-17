import { DataSource } from "./DataSource";
import { plainToClass } from "class-transformer";
import { User } from '../../model/User';
import { config } from "../../config";

export class UserDataSource extends DataSource {

  public async get(id: number): Promise<User | null> {
    const response = await this.request('GET', `${this.baseUrl}/${this.resource}/` + id);

    if (response.status !== 200) {
      return null;
    }

    const user = await response.json();

    return plainToClass(User, user);
  }

  public async new(user: User) {
    const response = await this.request('POST', `${this.baseUrl}/${this.resource}/`, [], user);
    return await response.json();
  }

  public async delete(user: User) {
    const response = await this.request('DELETE', `${this.baseUrl}/${this.resource}/${user.id}`);
    return await response.json();
  }

  public async update(user: User) {
    const response = await this.request('PATCH', `${this.baseUrl}/${this.resource}/${user.id}`, [], user);

    if (response.status !== 200) {
      return null;
    }

    const userEdited = await response.json();

    return plainToClass(User, userEdited);
  }

}

export const userDataSource = new UserDataSource(config.api, 'api/users');
