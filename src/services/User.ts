class User {
  public async me() {
    const response = await fetch('http://localhost/login-backend/public/users/me', {
      credentials: 'include'
    });

    return await response.json();
  }

  public async login(email: string, password: string) {
    const response = await fetch('http://localhost/login-backend/public/login', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `email=${email}&password=${password}`,
    });

    return await response.json();
  }

  public async logout() {
    const response = await fetch('http://localhost/login-backend/public/logout');
    return await response.json();
  }
}

export const user = new User();
