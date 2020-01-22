class User {
  public me() {
    return fetch('http://localhost/login-backend/public/me');
  }

  public async login(email: string, password: string) {
    return await fetch('http://localhost/login-backend/public/login', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `email=${email}&password=${password}`
    });
  }

  public async logout() {
    return await fetch('http://localhost/login-backend/public/logout');
  }
}

export const user = new User();
