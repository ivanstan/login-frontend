export class Hydra {

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

}
