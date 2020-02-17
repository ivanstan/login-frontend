import { User } from "../../model/User";

export class DataSource {

  protected baseUrl: string;
  protected resource: string;

  constructor(baseUrl: string, resource: string) {
    this.baseUrl = baseUrl;
    this.resource = resource;
  }

  public async request(method: string, url: string, params = [], body: any = null): Promise<Response> {
    let options: any = {
      method: method,
      headers: {},
      credentials: 'include'
    };

    if (method === 'PATCH' && body !== null) {
      options.headers['Accept'] = 'application/json';
      options.headers['Content-Type'] = 'application/merge-patch+json';
      options.body = JSON.stringify(body);
    }

    return await fetch(url, options);
  }

  public async collection(options: any): Promise<User[]> {
    const result: User[] = [];
    const response = await this.request('GET', `${this.baseUrl}/${this.resource}/`);

    if (response.status !== 200) {
      return result;
    }

    const data = await response.json();

    console.log(data);

    return data;
  }
}
